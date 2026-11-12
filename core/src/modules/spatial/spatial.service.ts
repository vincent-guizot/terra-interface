import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { HOMESTEAD_METADATA, ZONE_DEFINITIONS } from '../../constants/homestead.constants';

@Injectable()
export class SpatialService {
  constructor(private prisma: PrismaService) {}

  async getHomesteadCanonical() {
    try {
      const homestead = await this.prisma.homestead.findFirst({
        include: {
          zones: {
            include: {
              buildings: true,
              facilities: {
                include: { equipment: true },
              },
            },
          },
        },
      });

      if (homestead && homestead.zones.length > 0) {
        return homestead;
      }
    } catch (err) {
      // Database not yet seeded or offline, utilize verified master plan constants
    }

    return {
      name: HOMESTEAD_METADATA.NAME,
      totalAreaSqm: HOMESTEAD_METADATA.TOTAL_AREA_SQM,
      dimensions: HOMESTEAD_METADATA.DIMENSIONS,
      location: HOMESTEAD_METADATA.LOCATION,
      stewardName: HOMESTEAD_METADATA.STEWARD,
      zones: ZONE_DEFINITIONS.map((z, idx) => ({
        id: `zone-${z.code.toLowerCase()}`,
        code: z.code,
        name: z.name,
        areaSqm: z.areaSqm,
        type: z.domain,
        colorHex: z.colorHex,
        description: z.description,
      })),
    };
  }

  async getZones() {
    try {
      const zones = await this.prisma.zone.findMany({
        include: {
          buildings: true,
          facilities: { include: { equipment: true } },
          batches: { where: { status: 'ACTIVE' } },
        },
        orderBy: { code: 'asc' },
      });
      if (zones.length > 0) return zones;
    } catch (err) {
      // Fallback to canonical definitions
    }

    return ZONE_DEFINITIONS;
  }

  async getZoneByCode(code: string) {
    try {
      const zone = await this.prisma.zone.findUnique({
        where: { code },
        include: {
          buildings: true,
          facilities: { include: { equipment: true } },
          batches: true,
        },
      });
      if (zone) return zone;
    } catch (err) {
      // Fallback
    }

    const fallback = ZONE_DEFINITIONS.find((z) => z.code.toUpperCase() === code.toUpperCase());
    if (!fallback) throw new NotFoundException(`Zone ${code} not found in master plan`);
    return fallback;
  }
}
