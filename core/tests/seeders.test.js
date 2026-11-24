import test from 'node:test';
import assert from 'node:assert/strict';
import { tableSeeders } from '../prisma/seeders/registry.js';
import { seedDatabase, validateSeedData } from '../prisma/seeders/run-seeders.js';
import { resolveReferences } from '../prisma/seeders/seed-table.js';

function mockDatabase(failTable) {
  let store = new Map(tableSeeders.map(seed => [seed.table, []]));
  store.get('homestead').push({ id: 'existing-farm-id', name: "Vincent's Farm" });
  const database = {
    get store() { return store; },
    async $transaction(callback) {
      const draft = structuredClone(store);
      const delegates = Object.fromEntries([...draft].map(([table, rows]) => [table, {
        async findFirst({ where }) { return rows.find(row => Object.entries(where).every(([key, value]) => row[key] === value)) || null; },
        async create({ data }) {
          if (table === failTable) throw new Error('Simulated table failure');
          assert(!rows.some(row => row.id === data.id), 'Seed IDs must be unique');
          const saved = structuredClone(data);
          rows.push(saved);
          return saved;
        },
      }]));
      const result = await callback(delegates);
      store = draft;
      return result;
    },
  };
  return database;
}

test('all Prisma tables have valid demo JSON and resolved dependencies', async () => {
  const result = await validateSeedData();
  assert.equal(result.tables, 38);
  assert.equal(result.records, 83);
  for (const seed of tableSeeders) assert((await seed.load()).length > 0, `${seed.table} needs demo examples`);
});

test('reruns preserve existing IDs and do not duplicate records or history', async () => {
  const database = mockDatabase();
  const first = await seedDatabase(database);
  assert.equal(first.reduce((sum, row) => sum + row.created, 0), 82);
  for (const zone of database.store.get('zone')) assert.equal(zone.homesteadId, 'existing-farm-id');
  const before = structuredClone(database.store);
  const second = await seedDatabase(database);
  assert.equal(second.reduce((sum, row) => sum + row.created, 0), 0);
  assert.deepEqual(database.store, before);
});

test('table failures abort the transaction and missing references fail explicitly', async () => {
  const database = mockDatabase('aiRecommendation');
  const before = structuredClone(database.store);
  await assert.rejects(seedDatabase(database), /Simulated table failure/);
  assert.deepEqual(database.store, before);
  assert.throws(() => resolveReferences({ $ref: { table: 'zone', key: 'missing' } }, new Map()), /Unresolved seed reference/);
});
