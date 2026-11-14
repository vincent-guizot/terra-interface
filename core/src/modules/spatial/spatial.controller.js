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
exports.SpatialController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const spatial_service_1 = require("./spatial.service");
const zone_response_dto_1 = require("./dto/zone-response.dto");
let SpatialController = class SpatialController {
    constructor(spatialService) {
        this.spatialService = spatialService;
    }
    async getCanonical() {
        return this.spatialService.getHomesteadCanonical();
    }
    async getZones() {
        return this.spatialService.getZones();
    }
    async getZone(code) {
        return this.spatialService.getZoneByCode(code);
    }
};
exports.SpatialController = SpatialController;
__decorate([
    (0, common_1.Get)('canonical'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get canonical homestead spatial master plan',
        description: "Returns Vincent's Farm 300 m² (15m x 20m) master footprint and all 7 canonical zones.",
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Canonical spatial hierarchy' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SpatialController.prototype, "getCanonical", null);
__decorate([
    (0, common_1.Get)('zones'),
    (0, swagger_1.ApiOperation)({
        summary: 'List all 7 spatial zones',
        description: 'Retrieves sectors Z-01 through Z-07 with physical area, buildings, and facilities.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of zones', type: [zone_response_dto_1.ZoneResponseDto] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SpatialController.prototype, "getZones", null);
__decorate([
    (0, common_1.Get)('zones/:code'),
    (0, swagger_1.ApiOperation)({ summary: 'Get zone detail by code (e.g., Z-01, Z-02)' }),
    (0, swagger_1.ApiParam)({ name: 'code', example: 'Z-01' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Zone details', type: zone_response_dto_1.ZoneResponseDto }),
    __param(0, (0, common_1.Param)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SpatialController.prototype, "getZone", null);
exports.SpatialController = SpatialController = __decorate([
    (0, swagger_1.ApiTags)('Homestead Spatial'),
    (0, common_1.Controller)('homestead'),
    __metadata("design:paramtypes", [spatial_service_1.SpatialService])
], SpatialController);
