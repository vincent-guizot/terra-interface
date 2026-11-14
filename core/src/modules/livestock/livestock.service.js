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
var LivestockService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivestockService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const joper_growth_model_1 = require("./joper-growth.model");
const ruminant_paddock_1 = require("./ruminant-paddock");
const CANONICAL_LIVESTOCK = [
    {
        id: 'liv-kub-flock-01',
        batchCode: 'BAT-2026-LIV-01',
        name: 'Ayam KUB Layer Flock Season 2',
        breed: 'Ayam KUB (Kampung Unggul Balitbangtan)',
        species: 'Gallus gallus domesticus',
        zoneCode: 'Z-03',
        zoneName: 'Poultry & Small Ruminants Hub',
        headCount: 24,
        housingSystem: 'Deep Litter Bedding + Covered Run',
        status: 'ACTIVE',
        primaryOutput: 'Pastured Table Eggs',
        productionRate: '87.5% Hen-Day Production (21 eggs/day)',
    },
    {
        id: 'liv-joper-flock-02',
        batchCode: 'BAT-2026-LIV-02',
        name: 'Joper Cross Meat Cohort #4',
        breed: 'Ayam Joper (Jawa Super)',
        species: 'Gallus gallus domesticus',
        zoneCode: 'Z-03',
        zoneName: 'Poultry & Small Ruminants Hub',
        headCount: 45,
        housingSystem: 'Slatted Bamboo Rearing Bay',
        status: 'ACTIVE',
        primaryOutput: 'Poultry Meat (Target 1.1 kg)',
        productionRate: 'Average Weight 890g (FCR 1.48)',
    },
    {
        id: 'liv-garut-sheep-01',
        batchCode: 'BAT-2026-LIV-03',
        name: 'Garut Sheep Grazing Mob',
        breed: 'Domba Garut',
        species: 'Ovis aries',
        zoneCode: 'Z-03',
        zoneName: 'Poultry & Small Ruminants Hub',
        headCount: 4,
        housingSystem: 'Rotational Grazing Paddock (Swale Run)',
        status: 'ACTIVE',
        primaryOutput: 'Biomass Mowing & Living Manure',
        productionRate: 'Paddock Rest Cycle 25 Days',
    },
    {
        id: 'liv-boer-goat-01',
        batchCode: 'BAT-2026-LIV-04',
        name: 'Boer Cross Brush Browsers',
        breed: 'Boer Cross Goat',
        species: 'Capra hircus',
        zoneCode: 'Z-03',
        zoneName: 'Poultry & Small Ruminants Hub',
        headCount: 4,
        housingSystem: 'Elevated Slatted Shed + Orchard Tether',
        status: 'ACTIVE',
        primaryOutput: 'Weed Clearance & Manure Pellets',
        productionRate: 'Orchard Understory Browse Cycle',
    },
];
let LivestockService = LivestockService_1 = class LivestockService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(LivestockService_1.name);
        this.eggHarvestLogs = [];
        this.feedingLogs = [];
        this.mortalityLogs = [];
    }
    async getAnimals(breed, housingSystem) {
        try {
            const batches = await this.prisma.batch.findMany({
                where: { domain: 'LIVESTOCK', status: 'ACTIVE' },
                include: { zone: true, livestockDetail: true },
            });
            if (batches.length > 0) {
                return batches.map((b) => ({
                    id: b.id,
                    batchCode: b.batchCode,
                    name: b.name,
                    breed: b.livestockDetail?.breed || 'Ayam KUB',
                    species: b.livestockDetail?.breed.includes('Goat') ? 'Capra hircus' : b.livestockDetail?.breed.includes('Sheep') ? 'Ovis aries' : 'Gallus gallus domesticus',
                    zoneCode: b.zone.code,
                    zoneName: b.zone.name,
                    headCount: Math.round(b.currentQuantity),
                    housingSystem: b.livestockDetail?.housingSystem || 'Deep Litter Coop',
                    status: b.status,
                    primaryOutput: 'Eggs & Manure',
                    productionRate: `${b.healthIndex ?? 95}% Flock Vitality`,
                }));
            }
        }
        catch (err) {
            this.logger.warn(`Prisma getAnimals fallback: ${err.message}`);
        }
        let items = [...CANONICAL_LIVESTOCK];
        if (breed) {
            items = items.filter((i) => i.breed.toLowerCase().includes(breed.toLowerCase()));
        }
        if (housingSystem) {
            items = items.filter((i) => i.housingSystem.toLowerCase().includes(housingSystem.toLowerCase()));
        }
        return items;
    }
    async recordEggHarvest(dto) {
        const totalHens = dto.totalHens || 24;
        const hdp = Math.round((dto.eggsCollected / totalHens) * 1000) / 10;
        const gradeA = dto.gradeACount ?? Math.max(0, dto.eggsCollected - (dto.crackedCount ?? 0));
        const cracked = dto.crackedCount ?? 0;
        const avgWeight = dto.averageEggWeightGrams || 45.2;
        const totalWeightKg = Number(((dto.eggsCollected * avgWeight) / 1000).toFixed(2));
        const record = {
            id: `egg-${Date.now()}`,
            batchCode: dto.batchCode,
            date: new Date().toISOString(),
            eggsCollected: dto.eggsCollected,
            gradeACount: gradeA,
            crackedCount: cracked,
            totalHens,
            henDayProductionPercent: hdp,
            averageEggWeightGrams: avgWeight,
            totalWeightKg,
            notes: dto.notes || 'Normal daily egg collection',
        };
        this.eggHarvestLogs.unshift(record);
        try {
            const batch = await this.prisma.batch.findUnique({ where: { batchCode: dto.batchCode } });
            if (batch) {
                await this.prisma.batchOutput.create({
                    data: {
                        batchId: batch.id,
                        productName: 'Fresh Pastured Eggs',
                        quantity: dto.eggsCollected,
                        measurementUnit: 'pcs',
                        qualityGrade: gradeA > 0 ? 'Grade A' : 'Cracked/Culinary',
                        destination: 'Homestead Pantry / Daily Kitchen',
                        notes: `HDP: ${hdp}%. Total weight: ${totalWeightKg} kg`,
                    },
                });
            }
        }
        catch (err) {
            this.logger.warn(`Prisma recordEggHarvest output fallback: ${err.message}`);
        }
        return record;
    }
    async recordFeeding(dto) {
        const record = {
            id: `feed-${Date.now()}`,
            batchCode: dto.batchCode,
            fedAt: new Date().toISOString(),
            feedType: dto.feedType,
            quantityKg: dto.quantityKg,
            circularPortionPercent: dto.circularPortionPercent ?? 50,
            feedTime: dto.feedTime || 'Ration',
            notes: dto.notes || 'Normal feeding intake',
        };
        this.feedingLogs.unshift(record);
        try {
            const batch = await this.prisma.batch.findUnique({ where: { batchCode: dto.batchCode } });
            if (batch) {
                await this.prisma.batchEvent.create({
                    data: {
                        batchId: batch.id,
                        eventType: 'FEEDING',
                        data: {
                            feedType: dto.feedType,
                            quantityKg: dto.quantityKg,
                            circularPortionPercent: dto.circularPortionPercent ?? 50,
                            feedTime: dto.feedTime || 'Ration',
                            notes: dto.notes || '',
                        },
                        recordedBy: 'Vincent',
                    },
                });
            }
        }
        catch (err) {
            this.logger.warn(`Prisma recordFeeding fallback: ${err.message}`);
        }
        return record;
    }
    async recordMortality(dto) {
        const record = {
            id: `mort-${Date.now()}`,
            batchCode: dto.batchCode,
            occurredAt: new Date().toISOString(),
            count: dto.count,
            suspectedCause: dto.suspectedCause,
            disposalMethod: dto.disposalMethod || 'Bokashi Deep Pit',
            notes: dto.notes,
        };
        this.mortalityLogs.unshift(record);
        try {
            const batch = await this.prisma.batch.findUnique({ where: { batchCode: dto.batchCode } });
            if (batch) {
                await this.prisma.batch.update({
                    where: { id: batch.id },
                    data: { currentQuantity: Math.max(0, batch.currentQuantity - dto.count) },
                });
            }
        }
        catch (err) {
            this.logger.warn(`Prisma recordMortality deduction fallback: ${err.message}`);
        }
        return record;
    }
    getEggHarvestLogs() {
        return this.eggHarvestLogs;
    }
    getFeedingLogs() {
        return this.feedingLogs;
    }
    getGrowthBenchmarks() {
        return joper_growth_model_1.joperStandardBenchmarks;
    }
    getPaddockPlan() {
        return ruminant_paddock_1.activePaddockPlan;
    }
};
exports.LivestockService = LivestockService;
exports.LivestockService = LivestockService = LivestockService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LivestockService);
