import assert from 'node:assert/strict';
import test from 'node:test';
import prisma from '../src/prisma/prisma.service.js';

// This suite exercises routing and calculations independently of database access.
prisma.aiRecommendation.count = async () => 1;
const { default: app } = await import('../src/app.js');

test('legacy operational endpoints and SSE survive the ESM cleanup', async () => {
  const server = app.listen(0, '127.0.0.1');
  await new Promise(resolve => server.once('listening', resolve));
  const url = `http://127.0.0.1:${server.address().port}/api/v1`;
  const controller = new AbortController();
  try {
    const dosing = await fetch(`${url}/cultivation/nutrient-dosing`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ecTarget: 1.8, currentEc: 1.2, reservoirLiters: 200 }),
    });
    assert.equal(dosing.status, 200);
    const dosingResponse = await dosing.json();
    assert.equal(dosingResponse.success, true);
    assert.equal(dosingResponse.data.solutionAPumpMl, 600);

    const invalid = await fetch(`${url}/energy-water/gateway/ingest`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: '{}',
    });
    assert.equal(invalid.status, 400);
    const invalidResponse = await invalid.json();
    assert.equal(invalidResponse.success, false);
    assert.equal(invalidResponse.error.code, 'VALIDATION_ERROR');
    assert.equal(invalidResponse.error.statusCode, 400);
    assert(Array.isArray(invalidResponse.error.details));

    const stream = await fetch(`${url}/telemetry/stream`, { signal: controller.signal });
    assert.equal(stream.status, 200);
    assert.match(stream.headers.get('content-type'), /text\/event-stream/);
    const reader = stream.body.getReader();
    const first = new TextDecoder().decode((await reader.read()).value);
    assert.match(first, /data: /);
    const snapshot = JSON.parse(first.split('data: ')[1].split('\n')[0]);
    assert.equal(typeof snapshot.batterySoC, 'number');
    await reader.cancel();
  } finally {
    controller.abort();
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
    await prisma.$disconnect();
  }
});


test('batch transition accepts valid input and rejects invalid requests before writing', async t => {
  const id = 'contract-batch';
  const originalRead = prisma.batch.findUnique;
  const originalTransaction = prisma.$transaction;
  t.after(() => {
    prisma.batch.findUnique = originalRead;
    prisma.$transaction = originalTransaction;
  });
  const read = t.mock.fn(async () => ({ id, status: 'ACTIVE' }));
  prisma.batch.findUnique = read;
  const writes = [];
  prisma.$transaction = async run => run({
    batch: {
      async update({ where, data }) {
        assert.equal(where.id, id);
        writes.push(data);
        return { id, status: data.status, statusHistory: [data.statusHistory.create] };
      }
    }
  });

  const server = app.listen(0, '127.0.0.1');
  try {
    await new Promise((resolve, reject) => {
      server.once('listening', resolve);
      server.once('error', reject);
    });
    const url = 'http://127.0.0.1:' + server.address().port + '/api/v1/universal-batches/' + id + '/transition';
    const patch = body => fetch(url, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    for (const [body, field] of [
      [{}, 'newStatus'],
      [{ newStatus: 'UNKNOWN' }, 'newStatus'],
      [{ newStatus: 'ON_HOLD' }, 'reason'],
      [{ newStatus: 'CANCELLED', reason: '   ' }, 'reason'],
      [{ newStatus: 'COMPLETED', reason: 123 }, 'reason']
    ]) {
      const response = await patch(body);
      assert.equal(response.status, 400);
      const { error } = await response.json();
      assert.equal(error.code, 'VALIDATION_ERROR');
      assert.equal(error.details[0].field, field);
    }
    assert.equal(read.mock.callCount(), 0);

    const illegal = await patch({ newStatus: 'PLANNED' });
    assert.equal(illegal.status, 400);
    assert.match((await illegal.json()).error.message, /Illegal lifecycle state transition/);
    assert.equal(writes.length, 0);

    const valid = await patch({ newStatus: 'ON_HOLD', reason: '  Inspect pump  ' });
    assert.equal(valid.status, 200);
    const { success, data } = await valid.json();
    assert.equal(success, true);
    assert.equal(data.status, 'ON_HOLD');
    assert.equal(data.statusHistory[0].reason, 'Inspect pump');
    assert.equal(writes.length, 1);
    assert.equal(writes[0].auditLogs.create.details, 'Inspect pump');
  } finally {
    server.closeAllConnections();
    await new Promise(resolve => server.close(resolve));
    await prisma.$disconnect();
  }
});
