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
var CultivationService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.CultivationService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const pest_scouting_dto_1 = require("./pest-scouting.dto");
const microgreen_yield_model_1 = require("./microgreen-yield.model");
const CANONICAL_CROP_CATALOG = [
    {
        id: 'crop-bok-choy',
        name: 'Bok Choy White Stem',
        category: 'Leafy Greens',
        scientificName: 'Brassica rapa subsp. chinensis',
        targetEcMin: 1.5,
        targetEcMax: 2.0,
        targetPhMin: 6.0,
        targetPhMax: 6.5,
        daysToMaturity: 30,
        growingMethod: 'NFT_SOLUTION',
    },
    {
        id: 'crop-butterhead',
        name: 'Butterhead Lettuce (Rex)',
        category: 'Leafy Greens',
        scientificName: 'Lactuca sativa var. capitata',
        targetEcMin: 1.2,
        targetEcMax: 1.6,
        targetPhMin: 5.8,
        targetPhMax: 6.4,
        daysToMaturity: 35,
        growingMethod: 'NFT_SOLUTION',
    },
    {
        id: 'crop-genovese-basil',
        name: 'Genovese Sweet Basil',
        category: 'Herbs',
        scientificName: 'Ocimum basilicum',
        targetEcMin: 1.0,
        targetEcMax: 1.4,
        targetPhMin: 5.5,
        targetPhMax: 6.5,
        daysToMaturity: 28,
        growingMethod: 'NFT_SOLUTION',
    },
    {
        id: 'crop-cherry-tomato',
        name: 'Sweet Cherry Tomato',
        category: 'Fruiting Vegetables',
        scientificName: 'Solanum lycopersicum var. cerasiforme',
        targetEcMin: 2.0,
        targetEcMax: 2.8,
        targetPhMin: 5.8,
        targetPhMax: 6.5,
        daysToMaturity: 65,
        growingMethod: 'DUTCH_BUCKET',
    },
    {
        id: 'crop-king-oyster',
        name: 'King Oyster Mushroom',
        category: 'Fungi',
        scientificName: 'Pleurotus eryngii',
        targetEcMin: 0.0,
        targetEcMax: 0.0,
        targetPhMin: 6.0,
        targetPhMax: 7.0,
        daysToMaturity: 25,
        growingMethod: 'SUBSTRATE_BAG',
    },
    {
        id: 'crop-sunflower-microgreen',
        name: 'Black Oil Sunflower Microgreens',
        category: 'Microgreens',
        scientificName: 'Helianthus annuus',
        targetEcMin: 0.8,
        targetEcMax: 1.2,
        targetPhMin: 6.0,
        targetPhMax: 6.8,
        daysToMaturity: 10,
        growingMethod: 'SHALLOW_TRAY',
    },
];
let CultivationService = CultivationService_1 = class CultivationService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(CultivationService_1.name);
        this.customVarieties = [];
        this.scoutingHistory = [];
    }
    calculateNutrientDosing(dto) {
        const { ecTarget, currentEc, reservoirLiters, targetPh, currentPh } = dto;
        const ecDeficit = Math.max(0, ecTarget - currentEc);
        const concentrateMl = Math.round((ecDeficit / 0.1) * (reservoirLiters / 10) * 5);
        let phAdjustment = {
            direction: 'NONE',
            amountMl: 0,
            notes: 'pH is within target buffer',
        };
        if (targetPh !== undefined && currentPh !== undefined) {
            if (currentPh > targetPh + 0.2) {
                const diff = currentPh - targetPh;
                const ml = Math.round(diff * (reservoirLiters / 100) * 15);
                phAdjustment = {
                    direction: 'PH_DOWN',
                    amountMl: ml,
                    notes: `Add ~${ml} mL Phosphoric Acid (pH Down) diluted in 1L rainwater.`,
                };
            }
            else if (currentPh < targetPh - 0.2) {
                const diff = targetPh - currentPh;
                const ml = Math.round(diff * (reservoirLiters / 100) * 12);
                phAdjustment = {
                    direction: 'PH_UP',
                    amountMl: ml,
                    notes: `Add ~${ml} mL Potassium Hydroxide/Silicate (pH Up) diluted in 1L rainwater.`,
                };
            }
        }
        return {
            solutionAPumpMl: concentrateMl,
            solutionBPumpMl: concentrateMl,
            targetEc: ecTarget,
            currentEc,
            ecDeficit: Number(ecDeficit.toFixed(2)),
            reservoirLiters,
            phAdjustment,
            status: ecDeficit > 0.3 ? 'CORRECTION_REQUIRED' : ecDeficit > 0 ? 'MINOR_DEFICIT' : 'BALANCED',
            instructions: concentrateMl > 0
                ? `Inject ${concentrateMl} mL of Solution A into swirling reservoir, mix 5 minutes, then inject ${concentrateMl} mL of Solution B. Do not combine concentrates raw.`
                : 'Nutrient reservoir is well balanced. Continue normal circulation cycles.',
        };
    }
    async getCatalog(category) {
        const combined = [...CANONICAL_CROP_CATALOG, ...this.customVarieties];
        if (category) {
            return combined.filter((c) => c.category.toLowerCase() === category.toLowerCase());
        }
        return combined;
    }
    async createCropVariety(dto) {
        const newItem = {
            id: `crop-${Date.now()}`,
            name: dto.name,
            category: dto.category,
            scientificName: dto.scientificName,
            targetEcMin: dto.targetEcMin ?? 1.4,
            targetEcMax: dto.targetEcMax ?? 1.8,
            targetPhMin: dto.targetPhMin ?? 5.8,
            targetPhMax: dto.targetPhMax ?? 6.5,
            daysToMaturity: dto.daysToMaturity ?? 30,
            growingMethod: dto.growingMethod ?? 'NFT_SOLUTION',
        };
        this.customVarieties.push(newItem);
        return newItem;
    }
    async getActiveBatches() {
        try {
            const batches = await this.prisma.batch.findMany({
                where: {
                    domain: 'CULTIVATION',
                    status: 'ACTIVE',
                },
                include: {
                    zone: true,
                    cultivationDetail: true,
                    outputs: true,
                },
                orderBy: { startDate: 'desc' },
            });
            if (batches.length > 0) {
                return batches;
            }
        }
        catch (err) {
            this.logger.warn(`Prisma active cultivation batches fallback: ${err.message}`);
        }
        return [
            {
                id: 'bat-cult-demo-01',
                batchCode: 'BAT-2026-CUL-01',
                name: 'Spring Greenhouse Bok Choy NFT',
                domain: 'CULTIVATION',
                zone: { code: 'Z-01', name: 'Smart Micro-Greenhouse' },
                status: 'ACTIVE',
                startDate: '2026-10-22T00:00:00.000Z',
                expectedEndDate: '2026-11-20T00:00:00.000Z',
                initialQuantity: 120,
                currentQuantity: 95,
                measurementUnit: 'heads',
                healthIndex: 98,
                cultivationDetail: {
                    growingMedium: 'NFT_SOLUTION',
                    channelId: 'NFT-Gully-Alpha',
                    ecTarget: 1.6,
                    phTarget: 6.2,
                    waterTempTargetC: 22.5,
                    photoperiodHours: 14,
                },
                outputs: [
                    { quantity: 14.5, measurementUnit: 'kg', qualityGrade: 'Grade A', recordedAt: '2026-11-05T08:00:00.000Z' },
                    { quantity: 12.0, measurementUnit: 'kg', qualityGrade: 'Grade A', recordedAt: '2026-11-10T08:00:00.000Z' },
                ],
                notes: 'Automated 15-minute NFT nutrient film stream. Zero pest pressure detected under insect screen.',
            },
        ];
    }
    getMicrogreenCalibration() {
        return microgreen_yield_model_1.standardMicrogreenCalibration;
    }
    recordPestScouting(dto) {
        let bioControl = dto.recommendedBioControl;
        if (!bioControl) {
            if (dto.identifiedPest === 'Aphids' || dto.identifiedPest === 'Spider Mites') {
                bioControl = pest_scouting_dto_1.organicPestFormulas.neemOilEmulsion.recipe;
            }
            else if (dto.identifiedPest === 'Powdery Mildew') {
                bioControl = pest_scouting_dto_1.organicPestFormulas.horsetailDecoction.recipe;
            }
            else if (dto.identifiedPest === 'Whiteflies' || dto.identifiedPest === 'Fungus Gnats') {
                bioControl = pest_scouting_dto_1.organicPestFormulas.yellowStickyTraps.recipe;
            }
            else {
                bioControl = pest_scouting_dto_1.organicPestFormulas.garlicChiliExtract.recipe;
            }
        }
        const record = {
            id: `scout-${Date.now()}`,
            ...dto,
            recommendedBioControl: bioControl,
            loggedAt: new Date().toISOString(),
        };
        this.scoutingHistory.unshift(record);
        return record;
    }
    getScoutingHistory() {
        return this.scoutingHistory;
    }
    getOrganicPestRecipes() {
        return pest_scouting_dto_1.organicPestFormulas;
    }
};
exports.CultivationService = CultivationService;
exports.CultivationService = CultivationService = CultivationService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CultivationService);
