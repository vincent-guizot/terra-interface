import { Prisma } from '@prisma/client';
import { tableSeeders } from './registry.js';
import { seedId, resolveReferences } from './seed-table.js';

export async function validateSeedData() {
  const models = Prisma.dmmf.datamodel.models;
  const delegates = models.map(model => model.name[0].toLowerCase() + model.name.slice(1));
  const tables = tableSeeders.map(seed => seed.table);
  if (new Set(tables).size !== models.length || delegates.some(table => !tables.includes(table))) {
    throw new Error('Seeder registry must cover every Prisma table exactly once');
  }
  const context = new Map();
  let total = 0;
  for (const seed of tableSeeders) {
    const model = models.find(model => model.name[0].toLowerCase() + model.name.slice(1) === seed.table);
    const records = await seed.load();
    if (!Array.isArray(records)) throw new Error(`${seed.table}: JSON must be an array`);
    const known = new Set();
    context.set(seed.table, new Map());
    for (const record of records) {
      if (!record.key || known.has(record.key) || record.demo !== true) throw new Error(`${seed.table}: invalid demo key`);
      known.add(record.key);
      const data = resolveReferences(record.data, context);
      for (const key of Object.keys(data)) {
        if (!model.fields.some(field => field.name === key && field.kind !== 'object')) throw new Error(`${seed.table}: unknown scalar ${key}`);
      }
      for (const field of model.fields.filter(field => field.kind !== 'object')) {
        const value = data[field.name];
        if (value === undefined) {
          if (field.isRequired && !field.hasDefaultValue && !field.isUpdatedAt && field.name !== 'id') throw new Error(`${seed.table}: missing ${field.name}`);
          continue;
        }
        if (value === null) { if (field.isRequired) throw new Error(`${seed.table}.${field.name}: null is not allowed`); continue; }
        if (field.kind === 'enum') {
          const allowed = Prisma.dmmf.datamodel.enums.find(item => item.name === field.type).values.map(item => item.name);
          if (!allowed.includes(value)) throw new Error(`${seed.table}.${field.name}: invalid enum`);
        } else if (field.type === 'DateTime' && !Number.isFinite(Date.parse(value))) throw new Error(`${seed.table}.${field.name}: invalid date`);
        else if (['Int', 'Float'].includes(field.type) && (typeof value !== 'number' || !Number.isFinite(value) || field.type === 'Int' && !Number.isInteger(value))) throw new Error(`${seed.table}.${field.name}: invalid number`);
        else if (field.type === 'String' && typeof value !== 'string') throw new Error(`${seed.table}.${field.name}: invalid string`);
        else if (field.type === 'Boolean' && typeof value !== 'boolean') throw new Error(`${seed.table}.${field.name}: invalid boolean`);
      }
      context.get(seed.table).set(record.key, { id: seedId(seed.table, record.key) });
      total++;
    }
  }
  return { tables: tables.length, records: total };
}

export async function seedDatabase(prisma) {
  await validateSeedData();
  return prisma.$transaction(async transaction => {
    const context = new Map();
    const results = [];
    for (const seed of tableSeeders) results.push(await seed(transaction, context));
    return results;
  }, { timeout: 60000 });
}
