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
var IntelligenceService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.IntelligenceService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const recommendations_engine_1 = require("./recommendations.engine");
const plant_diagnosis_engine_1 = require("./plant-diagnosis.engine");
const weather_forecast_dto_1 = require("./weather-forecast.dto");
const chat_history_serializer_1 = require("./chat-history.serializer");
const ecological_calculator_helper_1 = require("../../helpers/ecological-calculator.helper");
let IntelligenceService = IntelligenceService_1 = class IntelligenceService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(IntelligenceService_1.name);
        this.recommendations = [...recommendations_engine_1.defaultRecommendationsQueue];
        this.chatHistory = [];
        this.dynamicModifiers = {
            bonusCaloricDailyKcal: 0,
            cisternLitersDelta: 0,
            solarSurplusKw: 0,
            compostEfficiencyDelta: 0,
        };
        this.initDatabaseRecommendations();
    }
    async initDatabaseRecommendations() {
        try {
            const count = await this.prisma.aiRecommendation.count();
            if (count === 0) {
                for (const rec of recommendations_engine_1.defaultRecommendationsQueue) {
                    await this.prisma.aiRecommendation.create({
                        data: {
                            id: rec.id,
                            category: rec.category,
                            severity: rec.priority === 'Immediate' ? 'ACTION_REQUIRED' : rec.priority === 'Suggested' ? 'WARNING' : 'INFO',
                            title: rec.actionTitle,
                            actionText: rec.expectedBenefit,
                            isApplied: rec.status === 'APPLIED',
                        },
                    });
                }
                this.logger.log('Seeded initial AI recommendations to Prisma database');
            }
        }
        catch (err) {
            this.logger.warn(`Could not sync recommendations to DB: ${err.message}. Using in-memory store.`);
        }
    }
    async getAutonomyScores() {
        const dailyCalorieTarget = 5000;
        const baseCalories = 4200 + this.dynamicModifiers.bonusCaloricDailyKcal;
        const dailyCaloriesProduced = Math.max(0, baseCalories);
        const foodScore = Math.min(100, Math.round((dailyCaloriesProduced / dailyCalorieTarget) * 1000) / 10);
        const baseCisternLiters = 6850 + this.dynamicModifiers.cisternLitersDelta;
        const cisternStorageLiters = Math.max(500, Math.min(8000, baseCisternLiters));
        const waterAutonomyDays = ecological_calculator_helper_1.EcologicalCalculator.calculateWaterAutonomyDays(cisternStorageLiters, 340);
        const waterScore = Math.min(100, Math.round((waterAutonomyDays / 20) * 945) / 10);
        const solarDailyGenerationKwh = Math.round((22.4 + this.dynamicModifiers.solarSurplusKw) * 10) / 10;
        const batteryAutonomyHours = ecological_calculator_helper_1.EcologicalCalculator.calculateBatteryAutonomyHours(15.3, 91, 0.75, 0.9);
        const energyScore = 96.8;
        const wasteDivertedPercent = Math.min(100, Math.round((96.6 + this.dynamicModifiers.compostEfficiencyDelta) * 10) / 10);
        const circularityScore = wasteDivertedPercent;
        const rawComposite = foodScore * 0.35 +
            waterScore * 0.25 +
            energyScore * 0.25 +
            circularityScore * 0.15;
        const overallAutonomyScore = Math.round(rawComposite * 10) / 10;
        let rating = 'EXCELLENT';
        if (overallAutonomyScore < 50)
            rating = 'CRITICAL';
        else if (overallAutonomyScore < 70)
            rating = 'MODERATE';
        else if (overallAutonomyScore < 85)
            rating = 'GOOD';
        const metrics = {
            dailyCaloriesProduced,
            dailyCalorieTarget,
            cisternStorageLiters,
            waterAutonomyDays,
            solarDailyGenerationKwh,
            batteryAutonomyHours,
            wasteDivertedPercent,
        };
        return {
            overallAutonomyScore,
            foodScore,
            waterScore,
            energyScore,
            circularityScore,
            rating,
            metrics,
            calculatedAt: new Date().toISOString(),
        };
    }
    async getInsights() {
        return this.recommendations.filter((r) => r.status === 'PENDING');
    }
    async applyRecommendation(id, notes) {
        const rec = this.recommendations.find((r) => r.id === id);
        if (!rec) {
            throw new common_1.NotFoundException(`Recommendation with ID "${id}" not found.`);
        }
        rec.status = 'APPLIED';
        try {
            await this.prisma.aiRecommendation.updateMany({
                where: { id },
                data: { isApplied: true },
            });
        }
        catch {
        }
        if (rec.category === 'Soil' || rec.category === 'Livestock Feed') {
            this.dynamicModifiers.bonusCaloricDailyKcal += 150;
        }
        else if (rec.category === 'Irrigation') {
            this.dynamicModifiers.cisternLitersDelta += 450;
        }
        else if (rec.category === 'Energy Storage') {
            this.dynamicModifiers.solarSurplusKw += 0.8;
        }
        else if (rec.category === 'Circular') {
            this.dynamicModifiers.compostEfficiencyDelta += 0.8;
        }
        this.logger.log(`Recommendation "${rec.actionTitle}" [${id}] accepted. Notes: ${notes || 'None'}`);
        return rec;
    }
    async dismissRecommendation(id) {
        const rec = this.recommendations.find((r) => r.id === id);
        if (!rec) {
            throw new common_1.NotFoundException(`Recommendation with ID "${id}" not found.`);
        }
        rec.status = 'DISMISSED';
        try {
            await this.prisma.aiRecommendation.updateMany({
                where: { id },
                data: { isApplied: false },
            });
        }
        catch {
        }
        this.logger.log(`Recommendation "${rec.actionTitle}" [${id}] dismissed.`);
        return rec;
    }
    async diagnosePlant(dto) {
        const symptom = (0, plant_diagnosis_engine_1.diagnoseVisualDeficiency)(dto.leafZone, dto.chlorosisType);
        const recommendedTargetZone = dto.cropType?.toLowerCase().includes('tomato') || dto.cropType?.toLowerCase().includes('brassica')
            ? 'Zone 4: Permaculture Beds'
            : dto.cropType?.toLowerCase().includes('kangkung') || dto.cropType?.toLowerCase().includes('mint')
                ? 'Zone 2: Aquaponics Greenhouse'
                : 'Zone 1: Micro-Climate Nursery';
        return {
            probableDeficiency: symptom.probableDeficiency,
            organicHomesteadRemedy: symptom.organicHomesteadRemedy,
            urgency: symptom.urgency,
            recommendedTargetZone,
        };
    }
    async processQuery(dto) {
        const q = dto.query.toLowerCase();
        let reply = "Analyzing Vincent's Farm ecosystem parameters across all 7 zones...";
        let intentCategory = 'General Homestead Status';
        let relatedZones = ['Zone 1: Micro-Climate Nursery', 'Zone 7: Eco-Living Quarters & Lab'];
        let confidence = 0.92;
        if (q.includes('nitrogen') || q.includes('nutrient') || q.includes('cycle') || q.includes('nitrate')) {
            reply =
                'Nutrient loop status: Zone 2 biofilter is converting 94% of ammonia into bio-available nitrates. Nitrate concentration in Pond Alpha is 44 ppm, which is safe for tilapia and optimal for diverting to Zone 4 keyhole beds. 400 L/day of effluent supplies 85% of plant nitrogen with zero commercial fertilizer.';
            intentCategory = 'Nitrogen Cycling & Biofiltration';
            relatedZones = ['Zone 2: Aquaponics Greenhouse', 'Zone 4: Permaculture Beds'];
            confidence = 0.98;
        }
        else if (q.includes('tilapia') || q.includes('fish') || q.includes('aquaculture') || q.includes('catfish')) {
            reply =
                'Tilapia Batch B-24-TIL is at Day 88 with an average weight of 450g. Biological FCR (Feed Conversion Ratio) is optimal at 1.25 thanks to daily live BSF prepupae supplementation. Target harvest window opens in 14 days, with projected yield of 45.0 kg.';
            intentCategory = 'Aquaculture & FCR Optimization';
            relatedZones = ['Zone 2: Aquaponics Greenhouse'];
            confidence = 0.96;
        }
        else if (q.includes('solar') || q.includes('battery') || q.includes('energy') || q.includes('power')) {
            reply =
                'Microgrid status: 5.0 kWp photovoltaic array is generating 4.8 kW at peak irradiance. The 15.3 kWh LiFePO4 battery bank is at 91% SoC with 18.4 hours of autonomy at 0.75 kW homestead load. Excess solar energy is currently directed to the pond cascade aerator dump load.';
            intentCategory = 'Microgrid & Energy Autonomy';
            relatedZones = ['Zone 5: Water Harvesting Spine', 'Zone 6: Circular Biomass & Energy Hub'];
            confidence = 0.97;
        }
        else if (q.includes('rain') || q.includes('water') || q.includes('cistern') || q.includes('monsoon')) {
            const forecast = (0, weather_forecast_dto_1.generateWestJavaForecast)();
            reply = `Water reserves: 6,850 L stored across 4 cisterns (${ecological_calculator_helper_1.EcologicalCalculator.calculateWaterAutonomyDays(6850, 340)} days autonomy). ${forecast.advisory} Rain probability is ${forecast.probabilityOfPrecipitationPercent}% with estimated +${forecast.expectedRoofCatchmentLiters} L roof catchment during ${forecast.peakRainWindow}.`;
            intentCategory = 'Water Catchment & Microclimate';
            relatedZones = ['Zone 5: Water Harvesting Spine'];
            confidence = 0.95;
        }
        else if (q.includes('compost') || q.includes('bsf') || q.includes('maggot') || q.includes('waste')) {
            reply =
                'Circular bioconversion status: 14.0 kg/day of organic waste is 100% diverted. BSF Larvarium is yielding 3.2 kg/day live prepupae (42% crude protein), and Bokashi Pile #1 is maintaining 62°C in its thermophilic curing stage.';
            intentCategory = 'Circular Bioconversion & Waste Diversion';
            relatedZones = ['Zone 6: Circular Biomass & Energy Hub', 'Zone 3: Micro-Livestock Haven'];
            confidence = 0.97;
        }
        else if (q.includes('improve') || q.includes('recommend') || q.includes('action')) {
            reply =
                'Top 3 recommended improvements: 1) Inoculate Keyhole Bed #2 with bush beans post-harvest for biological N fixation. 2) Backwash vortex pre-filter before afternoon monsoon downpour. 3) Pre-cool mushroom storage chamber using midday solar surplus.';
            intentCategory = 'Actionable Recommendations';
            relatedZones = ['Zone 4: Permaculture Beds', 'Zone 5: Water Harvesting Spine', 'Zone 7: Eco-Living Quarters & Lab'];
            confidence = 0.94;
        }
        const auditRecord = {
            sessionId: dto.sessionId || 'session-default',
            stewardId: 'Vincent',
            query: dto.query,
            assistantResponse: reply,
            intentCategory,
            timestamp: new Date().toISOString(),
        };
        this.chatHistory.push(auditRecord);
        return {
            reply,
            intentCategory,
            relatedZones,
            confidenceScore: confidence,
            timestamp: auditRecord.timestamp,
        };
    }
    async getForecast() {
        return (0, weather_forecast_dto_1.generateWestJavaForecast)();
    }
    exportChatAudit() {
        return (0, chat_history_serializer_1.serializeChatAudit)(this.chatHistory);
    }
};
exports.IntelligenceService = IntelligenceService;
exports.IntelligenceService = IntelligenceService = IntelligenceService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], IntelligenceService);
