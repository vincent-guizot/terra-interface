import { prisma } from '../../prisma/prisma.service';

export interface DbHealthReport {
  status: 'UP' | 'DOWN';
  latencyMs: number;
  database: string;
  tableCounts?: {
    zones: number;
    batches: number;
    inventoryItems: number;
    recommendations: number;
  };
  error?: string;
  timestamp: string;
}

export async function checkDatabaseHealth(): Promise<DbHealthReport> {
  const start = Date.now();
  try {
    // Run simple lightweight ping query
    await prisma.$queryRaw`SELECT 1`;
    const latencyMs = Date.now() - start;

    let tableCounts;
    try {
      const [zones, batches, inventoryItems, recommendations] = await Promise.all([
        prisma.zone.count(),
        prisma.batch.count(),
        prisma.inventoryItem.count(),
        prisma.aiRecommendation.count(),
      ]);
      tableCounts = { zones, batches, inventoryItems, recommendations };
    } catch {
      // Table counts optional if not yet migrated
    }

    return {
      status: 'UP',
      latencyMs,
      database: 'PostgreSQL',
      tableCounts,
      timestamp: new Date().toISOString(),
    };
  } catch (err: any) {
    return {
      status: 'DOWN',
      latencyMs: Date.now() - start,
      database: 'PostgreSQL',
      error: err.message,
      timestamp: new Date().toISOString(),
    };
  }
}
