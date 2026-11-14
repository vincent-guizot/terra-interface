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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CultivationController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const cultivation_service_1 = require("./cultivation.service");
const nutrient_dosing_dto_1 = require("./dto/nutrient-dosing.dto");
const create_crop_variety_dto_1 = require("./dto/create-crop-variety.dto");
const pest_scouting_dto_1 = require("./pest-scouting.dto");
let CultivationController = class CultivationController {
    constructor(cultivationService) {
        this.cultivationService = cultivationService;
    }
    async getCatalog(category) {
        return this.cultivationService.getCatalog(category);
    }
    async createCropVariety(dto) {
        return this.cultivationService.createCropVariety(dto);
    }
    async getActiveBatches() {
        return this.cultivationService.getActiveBatches();
    }
    async calculateNutrientDosing(dto) {
        return this.cultivationService.calculateNutrientDosing(dto);
    }
    async getMicrogreensCalibration() {
        return this.cultivationService.getMicrogreenCalibration();
    }
    async recordPestScouting(dto) {
        return this.cultivationService.recordPestScouting(dto);
    }
    async getScoutingHistory() {
        return this.cultivationService.getScoutingHistory();
    }
    async getOrganicPestRecipes() {
        return this.cultivationService.getOrganicPestRecipes();
    }
};
exports.CultivationController = CultivationController;
__decorate([
    (0, common_1.Get)('catalog'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get crop variety catalog',
        description: 'Retrieves plant and mushroom cultivars with optimal EC, pH, and days to maturity.',
    }),
    (0, swagger_1.ApiQuery)({ name: 'category', required: false, description: 'Filter by category (Leafy Greens, Herbs, Fruiting Vegetables, Fungi, Microgreens)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of crop varieties' }),
    __param(0, (0, common_1.Query)('category')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CultivationController.prototype, "getCatalog", null);
__decorate([
    (0, common_1.Post)('catalog'),
    (0, swagger_1.ApiOperation)({ summary: 'Register a new crop or cultivar variety' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Crop variety registered successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_crop_variety_dto_1.CreateCropVarietyDto]),
    __metadata("design:returntype", Promise)
], CultivationController.prototype, "createCropVariety", null);
__decorate([
    (0, common_1.Get)('batches/active'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get all active cultivation batches',
        description: 'Returns active hydroponic, substrate, and raised bed batches in Zone 1 and Zone 4.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of active cultivation batches' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CultivationController.prototype, "getActiveBatches", null);
__decorate([
    (0, common_1.Post)('nutrient-dosing'),
    (0, swagger_1.ApiOperation)({
        summary: 'Calculate A/B nutrient concentrate and pH dosing',
        description: 'Calculates concentrate injections in mL based on current EC deficit, target EC, and reservoir volume.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Nutrient pump dosing calculations' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [nutrient_dosing_dto_1.NutrientDosingDto]),
    __metadata("design:returntype", Promise)
], CultivationController.prototype, "calculateNutrientDosing", null);
__decorate([
    (0, common_1.Get)('microgreens/calibration'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get microgreen yield and seeding calibration models',
        description: 'Provides seeding densities in grams per tray, blackout days, and fresh weight multipliers.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Microgreen calibrations' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CultivationController.prototype, "getMicrogreensCalibration", null);
__decorate([
    (0, common_1.Post)('pest-scouting'),
    (0, swagger_1.ApiOperation)({
        summary: 'Log pest scouting observation and receive organic biocontrol recipe',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Observation recorded with treatment recipe' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pest_scouting_dto_1.PestScoutingDto]),
    __metadata("design:returntype", Promise)
], CultivationController.prototype, "recordPestScouting", null);
__decorate([
    (0, common_1.Get)('pest-scouting/history'),
    (0, swagger_1.ApiOperation)({ summary: 'Get pest scouting observation history' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Historical scouting records' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CultivationController.prototype, "getScoutingHistory", null);
__decorate([
    (0, common_1.Get)('pest-scouting/recipes'),
    (0, swagger_1.ApiOperation)({
        summary: 'List organic biocontrol recipes',
        description: 'Recipes for Neem oil emulsion, Horsetail decoction, Garlic-chili extract, and mechanical traps.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Organic biopesticide recipes' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CultivationController.prototype, "getOrganicPestRecipes", null);
exports.CultivationController = CultivationController = __decorate([
    (0, swagger_1.ApiTags)('Homestead Cultivation'),
    (0, common_1.Controller)('cultivation'),
    __metadata("design:paramtypes", [cultivation_service_1.CultivationService])
], CultivationController);
