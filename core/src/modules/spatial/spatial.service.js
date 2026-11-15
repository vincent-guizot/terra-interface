"use strict";

import * as common_1 from "../../common/errors/http-exceptions.js";
import * as homestead_constants_1 from "../../constants/homestead.constants.js";
let SpatialService = class SpatialService {
  constructor(prisma) {
    this.prisma = prisma;
  }
  async getHomesteadCanonical() {
    try {
      const homestead = await this.prisma.homestead.findFirst({
        include: {
          zones: {
            include: {
              buildings: true,
              facilities: {
                include: {
                  equipment: true
                }
              }
            }
          }
        }
      });
      if (homestead && homestead.zones.length > 0) {
        return homestead;
      }
    } catch (err) {}
    return {
      name: homestead_constants_1.HOMESTEAD_METADATA.NAME,
      totalAreaSqm: homestead_constants_1.HOMESTEAD_METADATA.TOTAL_AREA_SQM,
      dimensions: homestead_constants_1.HOMESTEAD_METADATA.DIMENSIONS,
      location: homestead_constants_1.HOMESTEAD_METADATA.LOCATION,
      stewardName: homestead_constants_1.HOMESTEAD_METADATA.STEWARD,
      zones: homestead_constants_1.ZONE_DEFINITIONS.map((z, idx) => ({
        id: `zone-${z.code.toLowerCase()}`,
        code: z.code,
        name: z.name,
        areaSqm: z.areaSqm,
        type: z.domain,
        colorHex: z.colorHex,
        description: z.description
      }))
    };
  }
  async getZones() {
    try {
      const zones = await this.prisma.zone.findMany({
        include: {
          buildings: true,
          facilities: {
            include: {
              equipment: true
            }
          },
          batches: {
            where: {
              status: 'ACTIVE'
            }
          }
        },
        orderBy: {
          code: 'asc'
        }
      });
      if (zones.length > 0) return zones;
    } catch (err) {}
    return homestead_constants_1.ZONE_DEFINITIONS;
  }
  async getZoneByCode(code) {
    try {
      const zone = await this.prisma.zone.findUnique({
        where: {
          code
        },
        include: {
          buildings: true,
          facilities: {
            include: {
              equipment: true
            }
          },
          batches: true
        }
      });
      if (zone) return zone;
    } catch (err) {}
    const fallback = homestead_constants_1.ZONE_DEFINITIONS.find(z => z.code.toUpperCase() === code.toUpperCase());
    if (!fallback) throw new common_1.NotFoundException(`Zone ${code} not found in master plan`);
    return fallback;
  }
};
export { SpatialService };
