import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { once } from 'node:events';
import process from 'node:process';
import test from 'node:test';
import { PrismaClient } from '@prisma/client';

const databaseUrl = process.env.TERRA_TEST_DATABASE_URL;
const childCode = `
  const { default: app } = await import('./src/app.js');
  const server = app.listen(0, '127.0.0.1', () => process.send(server.address().port));
`;

async function withCore(run) {
  const child = spawn(process.execPath, ['--input-type=module', '-e', childCode], {
    cwd: new URL('../', import.meta.url),
    env: { ...process.env, DATABASE_URL: databaseUrl },
    stdio: ['ignore', 'inherit', 'inherit', 'ipc']
  });
  const exited = new Promise(resolve => child.once('close', resolve));
  const ready = new AbortController();
  const timer = setTimeout(() => ready.abort(), 10_000);
  try {
    const [port] = await Promise.race([
      once(child, 'message', { signal: ready.signal }),
      exited.then(code => { throw new Error('Core exited before listening: ' + code); })
    ]);
    await run('http://127.0.0.1:' + port + '/api/v1');
  } finally {
    clearTimeout(timer);
    ready.abort();
    child.kill();
    await exited;
  }
}

test('batch state and its logs survive a fresh Core process', {
  skip: databaseUrl ? false : 'Set TERRA_TEST_DATABASE_URL to a migrated local test database'
}, async () => {
  const url = new URL(databaseUrl);
  assert.match(url.protocol, /^postgres(?:ql)?:$/);
  assert.ok(['localhost', '127.0.0.1', '[::1]'].includes(url.hostname));
  assert.equal(url.pathname, '/terra_interface_test');
  const db = new PrismaClient({ datasources: { db: { url: databaseUrl } } });
  let farm;
  try {
    farm = await db.homestead.create({ data: { name: 'Batch persistence test' } });
    const zone = await db.zone.create({
      data: { code: farm.id, name: 'Test zone', homesteadId: farm.id, areaSqm: 1, type: 'Cultivation' }
    });
    const storage = await db.storageLocation.create({ data: { homesteadId: farm.id, name: 'Test storage', type: 'Dry' } });
    const item = await db.inventoryItem.create({ data: {
      homesteadId: farm.id, locationId: storage.id, sku: farm.id, name: 'Test crop', unit: 'kg', category: 'Pantry'
    } });
    let batch;
    let task;
    try {
    await withCore(async base => {
      const send = (path, body, method = 'POST') => fetch(base + path, {
        method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body)
      });
      const createTask = await send('/activities/tasks', { title: farm.id, time: '10:00' });
      assert.equal(createTask.status, 201);
      task = (await createTask.json()).data;
      assert.equal((await send('/activities/tasks', { title: farm.id, time: '25:00' })).status, 400);
      assert.equal((await send('/activities/tasks/' + task.id + '/toggle', {}, 'PATCH')).status, 200);
      const batchInput = {
        batchCode: farm.id, name: 'Persistence test', domain: 'CULTIVATION', zoneId: zone.id,
        startDate: new Date().toISOString(), initialQuantity: 24, measurementUnit: 'trays'
      };
      assert.equal((await send('/universal-batches', { ...batchInput, initialQuantity: 0 })).status, 400);
      const created = await send('/universal-batches', batchInput);
      assert.equal(created.status, 201);
      batch = (await created.json()).data;
      const path = '/universal-batches/' + batch.id + '/outputs';
      const harvest = { itemId: item.id, quantity: 5, measurementUnit: 'kg', requestId: crypto.randomUUID() };
      async function assertHarvestRolledBack() {
        const failed = await send(path, harvest);
        assert.equal(failed.status, 500);
        assert.equal((await failed.json()).error.code, 'INTERNAL_SERVER_ERROR');
        const persisted = await db.batch.findUniqueOrThrow({
          where: { id: batch.id },
          include: { outputs: true, auditLogs: true }
        });
        const inventory = await db.inventoryItem.findUniqueOrThrow({
          where: { id: item.id },
          include: { movements: true }
        });
        assert.equal(persisted.outputs.length, 0);
        assert.deepEqual(persisted.auditLogs.map(log => log.action), ['Universal Batch Created']);
        assert.equal(inventory.inStock, 0);
        assert.equal(inventory.movements.length, 0);
      }

      // Force a real database rejection after the output insert.
      await db.$executeRaw`ALTER TABLE "StockMovement" ADD CONSTRAINT "qa_reject_harvest"
        CHECK ("type" <> 'HARVEST_IN' OR "quantityDelta" <> 5) NOT VALID`;
      try {
        await assertHarvestRolledBack();
      } finally {
        await db.$executeRaw`ALTER TABLE "StockMovement" DROP CONSTRAINT "qa_reject_harvest"`;
      }

      // Fail later, after the output, movement and balance have all been written.
      await db.$executeRaw`ALTER TABLE "BatchHistory" ADD CONSTRAINT "qa_reject_harvest_audit"
        CHECK ("action" <> 'Harvest Output Recorded: 5 kg') NOT VALID`;
      try {
        await assertHarvestRolledBack();
      } finally {
        await db.$executeRaw`ALTER TABLE "BatchHistory" DROP CONSTRAINT "qa_reject_harvest_audit"`;
      }

      const replies = await Promise.all([send(path, harvest), send(path, harvest)]);
      for (const reply of replies) assert.equal(reply.status, 201);
      assert.equal((await send(path, { ...harvest, quantity: 6 })).status, 400);
      assert.equal((await send(path, { ...harvest, requestId: crypto.randomUUID(), measurementUnit: 'pcs' })).status, 400);
      const transition = body => fetch(base + '/universal-batches/' + batch.id + '/transition', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(5000)
      });

      const accepted = await transition({ newStatus: 'ON_HOLD', reason: 'Inspect pump' });
      assert.equal(accepted.status, 200);
      assert.equal((await accepted.json()).data.status, 'ON_HOLD');

      const rejected = await transition({ newStatus: 'COMPLETED' });
      assert.equal(rejected.status, 400);
      assert.match((await rejected.json()).error.message, /Illegal lifecycle state transition/);
    });
    await withCore(async base => {
      const response = await fetch(base + '/universal-batches/' + batch.id, {
        signal: AbortSignal.timeout(5000)
      });
      assert.equal(response.status, 200);
      const { data } = await response.json();
      assert.equal(data.status, 'ON_HOLD');
      assert.equal(data.statusHistory.length, 2);
      assert.equal(data.statusHistory[0].fromStatus, 'ACTIVE');
      assert.equal(data.statusHistory[0].toStatus, 'ON_HOLD');
      assert.equal(data.statusHistory[0].reason, 'Inspect pump');
      assert.equal(data.outputs.length, 1);
      assert.equal(data.outputs[0].quantity, 5);
      const stock = await db.inventoryItem.findUniqueOrThrow({ where: { id: item.id }, include: { movements: true } });
      assert.equal(stock.inStock, 5);
      assert.equal(stock.movements.length, 1);
      assert.equal(stock.movements[0].batchOutputId, data.outputs[0].id);
      assert.equal(stock.movements[0].quantityDelta, 5);
      assert.equal(data.initialQuantity, 24);
      assert.equal(data.measurementUnit, 'trays');

      const withdraw = quantityDelta => fetch(base + '/inventory/movements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ itemId: item.id, type: 'FEEDING_OUT', quantityDelta, unit: 'kg' })
      });
      assert.equal((await withdraw(-6)).status, 400);
      const unchanged = await db.inventoryItem.findUniqueOrThrow({ where: { id: item.id }, include: { movements: true } });
      assert.equal(unchanged.inStock, 5);
      assert.equal(unchanged.movements.length, 1);

      const concurrent = await Promise.all([withdraw(-4), withdraw(-4)]);
      assert.deepEqual(concurrent.map(response => response.status).sort(), [201, 400]);
      const remaining = await db.inventoryItem.findUniqueOrThrow({ where: { id: item.id }, include: { movements: true } });
      assert.equal(remaining.inStock, 1);
      assert.deepEqual(remaining.movements.map(movement => movement.quantityDelta).sort((a, b) => a - b), [-4, 5]);
      const tasks = await (await fetch(base + '/activities/tasks')).json();
      assert.equal(tasks.data.filter(row => row.title === farm.id).length, 1);
      assert.equal(tasks.data.find(row => row.id === task.id).completed, true);
      assert.equal(data.auditLogs.length, 3);
      assert.ok(data.auditLogs.some(log => log.action === 'Status transitioned to ON_HOLD' && log.details === 'Inspect pump'));
    });
    } finally {
      await db.workOrder.deleteMany({ where: { title: farm.id } });
      await db.stockMovement.deleteMany({ where: { itemId: item.id } });
      await db.inventoryItem.delete({ where: { id: item.id } });
    }
  } finally {
    try {
      if (farm) {
        await db.$transaction([
          db.batch.deleteMany({ where: { batchCode: farm.id } }),
          db.homestead.delete({ where: { id: farm.id } })
        ]);
      }
    } finally {
      await db.$disconnect();
    }
  }
});
