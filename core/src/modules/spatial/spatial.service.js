"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpatialService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const homestead_constants_1 = require("../../constants/homestead.constants");
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
                                include: { equipment: true },
                            },
                        },
                    },
                },
            });
            if (homestead && homestead.zones.length > 0) {
                return homestead;
            }
        }
        catch (err) {
        }
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
            if (zones.length > 0)
                return zones;
        }
        catch (err) {
        }
        return homestead_constants_1.ZONE_DEFINITIONS;
    }
    async getZoneByCode(code) {
        try {
            const zone = await this.prisma.zone.findUnique({
                where: { code },
                include: {
                    buildings: true,
                    facilities: { include: { equipment: true } },
                    batches: true,
                },
            });
            if (zone)
                return zone;
        }
        catch (err) {
        }
        const fallback = homestead_constants_1.ZONE_DEFINITIONS.find((z) => z.code.toUpperCase() === code.toUpperCase());
        if (!fallback)
            throw new common_1.NotFoundException(`Zone ${code} not found in master plan`);
        return fallback;
    }
};
exports.SpatialService = SpatialService;
exports.SpatialService = SpatialService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SpatialService);
