import { PrismaClient } from '@prisma/client';
import { ZONE_DEFINITIONS } from '../../src/constants/homestead.constants';

export async function seedZones(prisma: PrismaClient, homesteadId: string) {
  console.log('🌱 Seeding 7 Master Zones for Vincent\'s Farm...');
  const seededZones = [];

  for (const z of ZONE_DEFINITIONS) {
    const zone = await prisma.zone.upsert({
      where: { code: z.code },
      update: {
        name: z.name,
        areaSqm: z.areaSqm,
        type: z.domain,
        colorHex: z.colorHex,
      },
      create: {
        code: z.code,
        name: z.name,
        areaSqm: z.areaSqm,
        type: z.domain,
        colorHex: z.colorHex,
        homesteadId,
      },
    });
    seededZones.push(zone);
  }

  return seededZones;
}
