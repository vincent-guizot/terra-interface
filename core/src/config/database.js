import prisma from '../prisma/prisma.service.js';
import env from './env.js';

export const dbMode = env.DATABASE_URL ? 'NEON' : 'LOCAL';

// All callers pass fixed SQL and bind user values separately.
export async function query(text, params = []) {
  const rows = await prisma.$queryRawUnsafe(text, ...params);
  return { rows };
}

export async function testDbConnection() {
  try {
    await prisma.$queryRaw`SELECT 1 AS alive`;
    return { ok: true, mode: dbMode };
  } catch (error) {
    return { ok: false, mode: dbMode, error: error.message };
  }
}

export async function closeDbConnection() {
  await prisma.$disconnect();
}

export default { query, testDbConnection, closeDbConnection, dbMode };
