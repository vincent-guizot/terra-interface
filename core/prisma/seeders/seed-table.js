import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

export function seedId(table, key) {
  const hex = createHash('sha256').update(`${table}:${key}`).digest('hex');
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-8${hex.slice(13, 16)}-a${hex.slice(17, 20)}-${hex.slice(20, 32)}`;
}

export function resolveReferences(value, context) {
  if (Array.isArray(value)) return value.map(item => resolveReferences(item, context));
  if (value && typeof value === 'object') {
    if (value.$ref) {
      const { table, key } = value.$ref;
      const record = context.get(table)?.get(key);
      if (!record) throw new Error(`Unresolved seed reference ${table}:${key}`);
      return record.id;
    }
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, resolveReferences(item, context)]));
  }
  return value;
}

export function createTableSeeder(table, fileUrl) {
  const load = async () => JSON.parse(await readFile(fileUrl, 'utf8'));
  const seed = async (client, context) => {
    const records = await load();
    const identities = new Map();
    let created = 0;
    context.set(table, identities);
    for (const record of records) {
      const id = seedId(table, record.key);
      const data = resolveReferences(record.data, context);
      const where = record.match ? resolveReferences(record.match, context) : { id };
      const existing = await client[table].findFirst({ where });
      // Do not reset balances, overwrite edited records or append duplicate history on reruns.
      const saved = existing || await client[table].create({ data: { id, ...data } });
      if (!existing) created++;
      identities.set(record.key, saved);
    }
    return { table, total: records.length, created, reused: records.length - created };
  };
  return Object.assign(seed, { table, load });
}
