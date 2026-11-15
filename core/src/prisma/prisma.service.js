import { PrismaClient } from '@prisma/client';
import env from '../config/env.js';

const localUrl = new URL('postgresql://localhost');
localUrl.hostname = env.PGHOST;
localUrl.port = String(env.PGPORT);
localUrl.username = env.PGUSER;
localUrl.password = env.PGPASSWORD;
localUrl.pathname = `/${env.PGDATABASE}`;

export class PrismaService extends PrismaClient {
  constructor() {
    super({ datasources: { db: { url: env.DATABASE_URL || localUrl.toString() } } });
  }

  static getInstance() {
    if (!PrismaService.instance) PrismaService.instance = new PrismaService();
    return PrismaService.instance;
  }
}

export const prisma = PrismaService.getInstance();
export default prisma;
