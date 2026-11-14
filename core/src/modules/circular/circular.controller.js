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
exports.CircularController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const circular_service_1 = require("./circular.service");
const record_bsf_feed_dto_1 = require("./dto/record-bsf-feed.dto");
const record_maggot_harvest_dto_1 = require("./dto/record-maggot-harvest.dto");
const record_compost_turn_dto_1 = require("./dto/record-compost-turn.dto");
const record_compost_harvest_dto_1 = require("./dto/record-compost-harvest.dto");
let CircularController = class CircularController {
    constructor(circularService) {
        this.circularService = circularService;
    }
    async getCircularOverview() {
        return this.circularService.getCircularOverview();
    }
    async getBsfTrays() {
        return this.circularService.getBsfTrays();
    }
    async recordBsfFeed(dto) {
        return this.circularService.recordBsfFeed(dto);
    }
    async recordMaggotHarvest(dto) {
        return this.circularService.recordMaggotHarvest(dto);
    }
    async getCompostBatches() {
        return this.circularService.getCompostBatches();
    }
    async recordCompostTurn(dto) {
        return this.circularService.recordCompostTurn(dto);
    }
    async recordCompostHarvest(dto) {
        return this.circularService.recordCompostHarvest(dto);
    }
    getCircularityMetrics() {
        return this.circularService.getCircularityMetrics();
    }
    getBiocharStandards() {
        return this.circularService.getBiocharQuenchBatch();
    }
};
exports.CircularController = CircularController;
__decorate([
    (0, common_1.Get)('overview'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get circular systems overview and homestead closed-loop score',
        description: 'Calculates biomass recycling, insect bioconversion metrics, and total closed-loop percentage.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Circular systems overview' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CircularController.prototype, "getCircularOverview", null);
__decorate([
    (0, common_1.Get)('bsf/trays'),
    (0, swagger_1.ApiOperation)({ summary: 'Get active BSF bioconversion trays and prepupae readiness' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of active BSF stacked trays' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CircularController.prototype, "getBsfTrays", null);
__decorate([
    (0, common_1.Post)('bsf/feed'),
    (0, swagger_1.ApiOperation)({ summary: 'Record organic food scrap or substrate input into BSF tray' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'BSF feeding recorded' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [record_bsf_feed_dto_1.RecordBsfFeedDto]),
    __metadata("design:returntype", Promise)
], CircularController.prototype, "recordBsfFeed", null);
__decorate([
    (0, common_1.Post)('bsf/harvest'),
    (0, swagger_1.ApiOperation)({
        summary: 'Record live maggot prepupae crawl-off and frass bio-fertilizer harvest',
        description: 'Logs prepupae yield, calculates crude protein (42.4%), routes to livestock/fish, and creates inventory harvest movements.',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Maggot harvest recorded and added to inventory' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [record_maggot_harvest_dto_1.RecordMaggotHarvestDto]),
    __metadata("design:returntype", Promise)
], CircularController.prototype, "recordMaggotHarvest", null);
__decorate([
    (0, common_1.Get)('compost/batches'),
    (0, swagger_1.ApiOperation)({ summary: 'Get Bokashi and hot aerobic composting batches and maturity indices' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of compost bay statuses' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CircularController.prototype, "getCompostBatches", null);
__decorate([
    (0, common_1.Post)('compost/turn'),
    (0, swagger_1.ApiOperation)({
        summary: 'Log aerobic compost turning and temperature probe readings',
        description: 'Records core/edge temperatures, checks thermophilic pasteurization stage (55-65°C), and logs biochar activation additions.',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Compost turn and temperature recorded' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [record_compost_turn_dto_1.RecordCompostTurnDto]),
    __metadata("design:returntype", Promise)
], CircularController.prototype, "recordCompostTurn", null);
__decorate([
    (0, common_1.Post)('compost/harvest'),
    (0, swagger_1.ApiOperation)({ summary: 'Record mature humus harvest from compost bay into inventory' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Compost harvest recorded' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [record_compost_harvest_dto_1.RecordCompostHarvestDto]),
    __metadata("design:returntype", Promise)
], CircularController.prototype, "recordCompostHarvest", null);
__decorate([
    (0, common_1.Get)('metrics'),
    (0, swagger_1.ApiOperation)({ summary: 'Get homestead circularity index score and waste diversion statistics' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Circularity metrics' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CircularController.prototype, "getCircularityMetrics", null);
__decorate([
    (0, common_1.Get)('biochar/standards'),
    (0, swagger_1.ApiOperation)({ summary: 'Get biochar quench and nutrient charging standards' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Biochar activation standards' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CircularController.prototype, "getBiocharStandards", null);
exports.CircularController = CircularController = __decorate([
    (0, swagger_1.ApiTags)('Circular Systems & Bioconversion'),
    (0, common_1.Controller)('circular'),
    __metadata("design:paramtypes", [circular_service_1.CircularService])
], CircularController);
