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
exports.AquacultureController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const aquaculture_service_1 = require("./aquaculture.service");
const record_water_test_dto_1 = require("./dto/record-water-test.dto");
const record_fish_feed_dto_1 = require("./dto/record-fish-feed.dto");
let AquacultureController = class AquacultureController {
    constructor(aquacultureService) {
        this.aquacultureService = aquacultureService;
    }
    async getPonds() {
        return this.aquacultureService.getPonds();
    }
    async getWaterQuality(pondId) {
        return this.aquacultureService.getWaterQuality(pondId);
    }
    async recordWaterTest(dto) {
        return this.aquacultureService.recordWaterTest(dto);
    }
    async recordFeeding(dto) {
        return this.aquacultureService.recordFeeding(dto);
    }
    async getFishFeedLogs() {
        return this.aquacultureService.getFishFeedLogs();
    }
    async getAerationSchedule() {
        return this.aquacultureService.getAerationSchedule();
    }
};
exports.AquacultureController = AquacultureController;
__decorate([
    (0, common_1.Get)('ponds'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get bio-pond status and stocking metrics',
        description: 'Retrieves ponds in Zone 2: Tilapia IBC biofloc, Catfish tanks, and macrophyte basins.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of bio-ponds' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AquacultureController.prototype, "getPonds", null);
__decorate([
    (0, common_1.Get)('water-quality'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get water quality telemetry & test history',
        description: 'Returns DO (Dissolved Oxygen), pH, temp, ammonia, and nitrite readings.',
    }),
    (0, swagger_1.ApiQuery)({ name: 'pondId', required: false }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Historical water quality logs' }),
    __param(0, (0, common_1.Query)('pondId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AquacultureController.prototype, "getWaterQuality", null);
__decorate([
    (0, common_1.Post)('water-test'),
    (0, swagger_1.ApiOperation)({
        summary: 'Record chemical reagent or optical probe water test',
        description: 'Logs water parameters and automatically generates alerts if DO < 5.0 mg/L or Ammonia > 0.5 ppm.',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Water test logged and evaluated' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [record_water_test_dto_1.RecordWaterTestDto]),
    __metadata("design:returntype", Promise)
], AquacultureController.prototype, "recordWaterTest", null);
__decorate([
    (0, common_1.Post)('feeding'),
    (0, swagger_1.ApiOperation)({
        summary: 'Record fish feeding event with ration and behavior',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Fish feeding event recorded' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [record_fish_feed_dto_1.RecordFishFeedDto]),
    __metadata("design:returntype", Promise)
], AquacultureController.prototype, "recordFeeding", null);
__decorate([
    (0, common_1.Get)('feeding/history'),
    (0, swagger_1.ApiOperation)({ summary: 'Get fish feeding history' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Feeding logs' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AquacultureController.prototype, "getFishFeedLogs", null);
__decorate([
    (0, common_1.Get)('aeration/cycles'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get automated aeration duty cycles and sludge purging protocols',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Aeration cycle parameters' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AquacultureController.prototype, "getAerationSchedule", null);
exports.AquacultureController = AquacultureController = __decorate([
    (0, swagger_1.ApiTags)('Homestead Aquaculture'),
    (0, common_1.Controller)('aquaculture'),
    __metadata("design:paramtypes", [aquaculture_service_1.AquacultureService])
], AquacultureController);
