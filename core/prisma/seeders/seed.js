"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const homestead_constants_1 = require("../../src/constants/homestead.constants");
const zones_seeder_1 = require("./zones.seeder");
const production_types_seeder_1 = require("./production-types.seeder");
const storage_locations_seeder_1 = require("./storage-locations.seeder");
const batches_seeder_1 = require("./batches.seeder");
const prisma = new client_1.PrismaClient();
async function main() {
    console.log('================================================================');
    console.log('🌿 INITIATING TERRA INTERFACE DATABASE SEEDING ENGINE');
    console.log('   Target: Vincent\'s Farm (300 m² Homestead, West Java, ID)');
    console.log('================================================================');
    let homestead = await prisma.homestead.findFirst({
        where: { name: homestead_constants_1.HOMESTEAD_METADATA.NAME },
    });
    if (!homestead) {
        homestead = await prisma.homestead.create({
            data: {
                name: homestead_constants_1.HOMESTEAD_METADATA.NAME,
                totalAreaSqm: homestead_constants_1.HOMESTEAD_METADATA.TOTAL_AREA_SQM,
                dimensions: homestead_constants_1.HOMESTEAD_METADATA.DIMENSIONS,
                location: homestead_constants_1.HOMESTEAD_METADATA.LOCATION,
                climateType: homestead_constants_1.HOMESTEAD_METADATA.CLIMATE,
                stewardName: homestead_constants_1.HOMESTEAD_METADATA.STEWARD,
            },
        });
        console.log(`✅ Root Homestead "${homestead.name}" created with ID: ${homestead.id}`);
    }
    else {
        console.log(`ℹ️ Root Homestead "${homestead.name}" found (ID: ${homestead.id})`);
    }
    const zones = await (0, zones_seeder_1.seedZones)(prisma, homestead.id);
    console.log(`✅ Seeded ${zones.length} spatial zones across 300 m² master layout.`);
    const types = await (0, production_types_seeder_1.seedProductionTypes)(prisma, homestead.id);
    console.log(`✅ Seeded ${types.length} dynamic production types (Zero hardcoding).`);
    await (0, storage_locations_seeder_1.seedStorageAndInventory)(prisma, homestead.id);
    console.log('✅ Seeded storage micro-locations and SKU stock items.');
    await (0, batches_seeder_1.seedUniversalBatches)(prisma, zones);
    console.log('✅ Seeded active universal batches with multi-cut harvest outputs.');
    console.log('================================================================');
    console.log('🎉 DATABASE SEEDING COMPLETED SUCCESSFULLY — ZERO HARDCODED DATA');
    console.log('================================================================');
}
main()
    .catch((e) => {
    console.error('❌ Seeding error encountered:', e);
    process.exit(1);
})
    .finally(async () => {
    await prisma.$disconnect();
});
