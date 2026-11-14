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
exports.LivestockController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const livestock_service_1 = require("./livestock.service");
const record_egg_harvest_dto_1 = require("./dto/record-egg-harvest.dto");
const record_livestock_feed_dto_1 = require("./dto/record-livestock-feed.dto");
const record_mortality_dto_1 = require("./dto/record-mortality.dto");
let LivestockController = class LivestockController {
    constructor(livestockService) {
        this.livestockService = livestockService;
    }
    async getAnimals(breed, housingSystem) {
        return this.livestockService.getAnimals(breed, housingSystem);
    }
    async recordEggHarvest(dto) {
        return this.livestockService.recordEggHarvest(dto);
    }
    async getEggHarvestLogs() {
        return this.livestockService.getEggHarvestLogs();
    }
    async recordFeeding(dto) {
        return this.livestockService.recordFeeding(dto);
    }
    async getFeedingLogs() {
        return this.livestockService.getFeedingLogs();
    }
    async recordMortality(dto) {
        return this.livestockService.recordMortality(dto);
    }
    async getGrowthBenchmarks() {
        return this.livestockService.getGrowthBenchmarks();
    }
    async getPaddockPlan() {
        return this.livestockService.getPaddockPlan();
    }
};
exports.LivestockController = LivestockController;
__decorate([
    (0, common_1.Get)('animals'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get livestock inventory',
        description: 'Retrieves current flocks and herds in Zone 3 (Poultry & Small Ruminants Hub).',
    }),
    (0, swagger_1.ApiQuery)({ name: 'breed', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'housingSystem', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of livestock cohorts' }),
    __param(0, (0, common_1.Query)('breed')),
    __param(1, (0, common_1.Query)('housingSystem')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], LivestockController.prototype, "getAnimals", null);
__decorate([
    (0, common_1.Post)('egg-harvest'),
    (0, swagger_1.ApiOperation)({
        summary: 'Record daily egg collection and calculate Hen-Day Production %',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Egg harvest recorded and added to pantry' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [record_egg_harvest_dto_1.RecordEggHarvestDto]),
    __metadata("design:returntype", Promise)
], LivestockController.prototype, "recordEggHarvest", null);
__decorate([
    (0, common_1.Get)('egg-harvest/history'),
    (0, swagger_1.ApiOperation)({ summary: 'Get historical egg harvest records' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Egg collection logs' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LivestockController.prototype, "getEggHarvestLogs", null);
__decorate([
    (0, common_1.Post)('feeding'),
    (0, swagger_1.ApiOperation)({
        summary: 'Record daily feed ration for poultry or ruminants',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Feed ration recorded' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [record_livestock_feed_dto_1.RecordLivestockFeedDto]),
    __metadata("design:returntype", Promise)
], LivestockController.prototype, "recordFeeding", null);
__decorate([
    (0, common_1.Get)('feeding/history'),
    (0, swagger_1.ApiOperation)({ summary: 'Get feeding logs' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Historical feed ration records' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LivestockController.prototype, "getFeedingLogs", null);
__decorate([
    (0, common_1.Post)('mortality'),
    (0, swagger_1.ApiOperation)({
        summary: 'Record mortality event and decrement live batch population',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Mortality logged and population updated' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [record_mortality_dto_1.RecordMortalityDto]),
    __metadata("design:returntype", Promise)
], LivestockController.prototype, "recordMortality", null);
__decorate([
    (0, common_1.Get)('benchmarks/growth'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get meat bird and poultry growth benchmarks (FCR and target weights)',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Standard growth curves' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LivestockController.prototype, "getGrowthBenchmarks", null);
__decorate([
    (0, common_1.Get)('grazing/paddocks'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get rotational grazing paddock schedule and resting cycles',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Active rotational paddock plan' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LivestockController.prototype, "getPaddockPlan", null);
exports.LivestockController = LivestockController = __decorate([
    (0, swagger_1.ApiTags)('Homestead Livestock'),
    (0, common_1.Controller)('livestock'),
    __metadata("design:paramtypes", [livestock_service_1.LivestockService])
], LivestockController);
