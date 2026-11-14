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
var AquacultureService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AquacultureService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const catfish_schedule_1 = require("./catfish-schedule");
const tilapia_telemetry_service_1 = require("./tilapia-telemetry.service");
const CANONICAL_PONDS = [
    {
        id: 'pnd-01',
        pondCode: 'PND-01',
        name: 'Tilapia IBC Bio-Floc Tank Alpha',
        species: 'Oreochromis niloticus (Nile Tilapia)',
        volumeLiters: 4000,
        currentStockCount: 442,
        averageWeightGrams: 440,
        totalBiomassKg: 194.5,
        stockingDensityKgM3: 48.6,
        waterQuality: {
            dissolvedOxygenMgL: 6.2,
            pH: 7.2,
            waterTempC: 26.5,
            ammoniaPpm: 0.15,
            status: 'OPTIMAL',
        },
        feedingProtocol: '32% CP Floating Pellets + 30% Duckweed biomass supplement',
    },
    {
        id: 'pnd-02',
        pondCode: 'PND-02',
        name: 'Catfish High-Density Tarpaulin Tank',
        species: 'Clarias gariepinus (African Catfish)',
        volumeLiters: 2500,
        currentStockCount: 300,
        averageWeightGrams: 280,
        totalBiomassKg: 84.0,
        stockingDensityKgM3: 33.6,
        waterQuality: {
            dissolvedOxygenMgL: 5.4,
            pH: 6.9,
            waterTempC: 27.8,
            ammoniaPpm: 0.35,
            status: 'OPTIMAL',
        },
        feedingProtocol: 'Night feeding ration + BSF prepupae live feed',
    },
    {
        id: 'pnd-03',
        pondCode: 'PND-03',
        name: 'Duckweed & Azolla Biomass Basin',
        species: 'Lemna minor & Azolla pinnata',
        volumeLiters: 1000,
        currentStockCount: 0,
        averageWeightGrams: 0,
        totalBiomassKg: 15.0,
        stockingDensityKgM3: 15.0,
        waterQuality: {
            dissolvedOxygenMgL: 7.8,
            pH: 6.8,
            waterTempC: 25.0,
            ammoniaPpm: 0.05,
            status: 'OPTIMAL',
        },
        feedingProtocol: 'Fed by aquaponic nitrifying overflow, harvested daily for chicken/fish feed',
    },
];
let AquacultureService = AquacultureService_1 = class AquacultureService {
    constructor(prisma, telemetryService) {
        this.prisma = prisma;
        this.telemetryService = telemetryService;
        this.logger = new common_1.Logger(AquacultureService_1.name);
        this.waterQualityLogs = [];
        this.fishFeedLogs = [];
    }
    async getPonds() {
        try {
            const batches = await this.prisma.batch.findMany({
                where: { domain: 'AQUACULTURE', status: 'ACTIVE' },
                include: { zone: true, aquacultureDetail: true },
            });
            if (batches.length > 0) {
                return batches.map((b) => {
                    const volLiters = (b.aquacultureDetail?.pondVolumeM3 || 4) * 1000;
                    const avgWeightGrams = 440;
                    const totalBiomassKg = Number(((b.currentQuantity * avgWeightGrams) / 1000).toFixed(1));
                    const densityKgM3 = Number((totalBiomassKg / (b.aquacultureDetail?.pondVolumeM3 || 4)).toFixed(1));
                    return {
                        id: b.id,
                        pondCode: 'PND-01',
                        name: b.name,
                        species: b.aquacultureDetail?.species || 'Nile Tilapia',
                        volumeLiters: volLiters,
                        currentStockCount: Math.round(b.currentQuantity),
                        averageWeightGrams: avgWeightGrams,
                        totalBiomassKg,
                        stockingDensityKgM3: densityKgM3,
                        waterQuality: {
                            dissolvedOxygenMgL: 6.2,
                            pH: 7.2,
                            waterTempC: 26.5,
                            ammoniaPpm: 0.15,
                            status: 'OPTIMAL',
                        },
                        feedingProtocol: 'Pellets & Duckweed',
                    };
                });
            }
        }
        catch (err) {
            this.logger.warn(`Prisma getPonds fallback: ${err.message}`);
        }
        return CANONICAL_PONDS;
    }
    async recordWaterTest(dto) {
        const evaluation = this.telemetryService.evaluateWaterQuality({
            dissolvedOxygenMgL: dto.dissolvedOxygenMgL,
            pH: dto.pH,
            waterTempC: dto.waterTempC,
            ammoniaPpm: dto.ammoniaPpm,
            nitratePpm: dto.nitratePpm || 10,
        });
        const record = {
            id: `wtest-${Date.now()}`,
            pondId: dto.pondId,
            testedAt: new Date().toISOString(),
            dissolvedOxygenMgL: dto.dissolvedOxygenMgL,
            pH: dto.pH,
            waterTempC: dto.waterTempC,
            ammoniaPpm: dto.ammoniaPpm,
            nitritePpm: dto.nitritePpm || 0.05,
            nitratePpm: dto.nitratePpm || 15.0,
            evaluation,
            notes: dto.notes || '',
        };
        this.waterQualityLogs.unshift(record);
        try {
            const pond = CANONICAL_PONDS.find((p) => p.pondCode === dto.pondId || p.id === dto.pondId);
            if (pond) {
                pond.waterQuality = {
                    dissolvedOxygenMgL: dto.dissolvedOxygenMgL,
                    pH: dto.pH,
                    waterTempC: dto.waterTempC,
                    ammoniaPpm: dto.ammoniaPpm,
                    status: evaluation.status,
                };
            }
        }
        catch (err) {
        }
        return record;
    }
    getWaterQuality(pondId) {
        let logs = this.waterQualityLogs;
        if (pondId) {
            logs = logs.filter((l) => l.pondId.toLowerCase() === pondId.toLowerCase());
        }
        if (logs.length === 0) {
            return [
                {
                    id: 'wtest-default-01',
                    pondId: pondId || 'PND-01',
                    testedAt: new Date().toISOString(),
                    dissolvedOxygenMgL: 6.2,
                    pH: 7.2,
                    waterTempC: 26.5,
                    ammoniaPpm: 0.15,
                    nitritePpm: 0.02,
                    nitratePpm: 20.0,
                    evaluation: { status: 'OPTIMAL', alerts: [] },
                    notes: 'Optimal nitrification cycle in bio-filter media.',
                },
            ];
        }
        return logs;
    }
    async recordFeeding(dto) {
        const record = {
            id: `ffeed-${Date.now()}`,
            pondId: dto.pondId,
            fedAt: new Date().toISOString(),
            feedType: dto.feedType,
            amountGrams: dto.amountGrams,
            feedingBehavior: dto.feedingBehavior || 'Aggressive',
            waterTemperatureC: dto.waterTemperatureC || 26.5,
            notes: dto.notes,
        };
        this.fishFeedLogs.unshift(record);
        return record;
    }
    getFishFeedLogs() {
        return this.fishFeedLogs;
    }
    getAerationSchedule() {
        return catfish_schedule_1.catfishAerationSchedule;
    }
};
exports.AquacultureService = AquacultureService;
exports.AquacultureService = AquacultureService = AquacultureService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        tilapia_telemetry_service_1.TilapiaTelemetryService])
], AquacultureService);
