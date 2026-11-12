import { PrismaClient } from '@prisma/client';
import { HOMESTEAD_METADATA } from '../../src/constants/homestead.constants';
import { seedZones } from './zones.seeder';
import { seedProductionTypes } from './production-types.seeder';
import { seedStorageAndInventory } from './storage-locations.seeder';
import { seedUniversalBatches } from './batches.seeder';

const prisma = new PrismaClient();

async function main() {
  console.log('================================================================');
  console.log('🌿 INITIATING TERRA INTERFACE DATABASE SEEDING ENGINE');
  console.log('   Target: Vincent\'s Farm (300 m² Homestead, West Java, ID)');
  console.log('================================================================');

  // 1. Seed or Upsert Root Homestead
  let homestead = await prisma.homestead.findFirst({
    where: { name: HOMESTEAD_METADATA.NAME },
  });

  if (!homestead) {
    homestead = await prisma.homestead.create({
      data: {
        name: HOMESTEAD_METADATA.NAME,
        totalAreaSqm: HOMESTEAD_METADATA.TOTAL_AREA_SQM,
        dimensions: HOMESTEAD_METADATA.DIMENSIONS,
        location: HOMESTEAD_METADATA.LOCATION,
        climateType: HOMESTEAD_METADATA.CLIMATE,
        stewardName: HOMESTEAD_METADATA.STEWARD,
      },
    });
    console.log(`✅ Root Homestead "${homestead.name}" created with ID: ${homestead.id}`);
  } else {
    console.log(`ℹ️ Root Homestead "${homestead.name}" found (ID: ${homestead.id})`);
  }

  // 2. Seed 7 Master Zones
  const zones = await seedZones(prisma, homestead.id);
  console.log(`✅ Seeded ${zones.length} spatial zones across 300 m² master layout.`);

  // 3. Seed Configurable Production Types & Custom Field Schemas
  const types = await seedProductionTypes(prisma, homestead.id);
  console.log(`✅ Seeded ${types.length} dynamic production types (Zero hardcoding).`);

  // 4. Seed Storage Locations & Inventory Items
  await seedStorageAndInventory(prisma, homestead.id);
  console.log('✅ Seeded storage micro-locations and SKU stock items.');

  // 5. Seed Universal Batches with Multi-Harvests & Audit History
  await seedUniversalBatches(prisma, zones);
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
