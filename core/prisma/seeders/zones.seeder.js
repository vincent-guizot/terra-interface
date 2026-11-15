"use strict";

import * as homestead_constants_1 from "../../src/constants/homestead.constants.js";
async function seedZones(prisma, homesteadId) {
  console.log('🌱 Seeding 7 Master Zones for Vincent\'s Farm...');
  const seededZones = [];
  for (const z of homestead_constants_1.ZONE_DEFINITIONS) {
    const zone = await prisma.zone.upsert({
      where: {
        code: z.code
      },
      update: {
        name: z.name,
        areaSqm: z.areaSqm,
        type: z.domain,
        colorHex: z.colorHex
      },
      create: {
        code: z.code,
        name: z.name,
        areaSqm: z.areaSqm,
        type: z.domain,
        colorHex: z.colorHex,
        homesteadId
      }
    });
    seededZones.push(zone);
  }
  return seededZones;
}
export { seedZones };
