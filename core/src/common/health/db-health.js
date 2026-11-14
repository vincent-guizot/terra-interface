"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkDatabaseHealth = checkDatabaseHealth;
const prisma_service_1 = require("../../prisma/prisma.service");
async function checkDatabaseHealth() {
    const start = Date.now();
    try {
        await prisma_service_1.prisma.$queryRaw `SELECT 1`;
        const latencyMs = Date.now() - start;
        let tableCounts;
        try {
            const [zones, batches, inventoryItems, recommendations] = await Promise.all([
                prisma_service_1.prisma.zone.count(),
                prisma_service_1.prisma.batch.count(),
                prisma_service_1.prisma.inventoryItem.count(),
                prisma_service_1.prisma.aiRecommendation.count(),
            ]);
            tableCounts = { zones, batches, inventoryItems, recommendations };
        }
        catch {
        }
        return {
            status: 'UP',
            latencyMs,
            database: 'PostgreSQL',
            tableCounts,
            timestamp: new Date().toISOString(),
        };
    }
    catch (err) {
        return {
            status: 'DOWN',
            latencyMs: Date.now() - start,
            database: 'PostgreSQL',
            error: err.message,
            timestamp: new Date().toISOString(),
        };
    }
}
