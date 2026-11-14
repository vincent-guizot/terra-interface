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
exports.EnergyWaterController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const energy_water_service_1 = require("./energy-water.service");
const telemetry_ingest_dto_1 = require("./dto/telemetry-ingest.dto");
const dispatch_policy_dto_1 = require("./dto/dispatch-policy.dto");
let EnergyWaterController = class EnergyWaterController {
    constructor(energyWaterService) {
        this.energyWaterService = energyWaterService;
    }
    getLiveTelemetry() {
        return this.energyWaterService.getLiveSnapshot();
    }
    streamTelemetry() {
        return this.energyWaterService.getTelemetryStream().pipe((0, operators_1.map)((event) => ({
            data: event.data,
        })));
    }
    async ingestTelemetry(dto) {
        return this.energyWaterService.ingestTelemetry(dto);
    }
    getHistoricalTelemetry(hours) {
        return this.energyWaterService.getHistoricalTelemetry(hours ? Number(hours) : 24);
    }
    getDispatchPolicy() {
        return this.energyWaterService.getDispatchPolicy();
    }
    updateDispatchPolicy(dto) {
        return this.energyWaterService.updateDispatchPolicy(dto);
    }
    getDumpLoadStatus() {
        return this.energyWaterService.getDumpLoadStatus();
    }
};
exports.EnergyWaterController = EnergyWaterController;
__decorate([
    (0, common_1.Get)('telemetry/live'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get live homestead microgrid & water telemetry snapshot',
        description: 'Returns real-time solar generation, inverter load, LiFePO4 battery SoC, cistern levels, and active alerts.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Live telemetry snapshot' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], EnergyWaterController.prototype, "getLiveTelemetry", null);
__decorate([
    (0, common_1.Sse)('telemetry/stream'),
    (0, swagger_1.ApiOperation)({
        summary: 'Real-time Server-Sent Events (SSE) telemetry stream',
        description: 'Pushes live telemetry updates to the Console UI whenever new readings arrive or conditions change.',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], EnergyWaterController.prototype, "streamTelemetry", null);
__decorate([
    (0, common_1.Post)('telemetry/ingest'),
    (0, swagger_1.ApiOperation)({
        summary: 'Ingest IoT microcontroller sensor telemetry (ESP32 Gateway)',
        description: 'Accepts multivariate telemetry packets from Zone 2 & Zone 5 probes, evaluates protection invariants, and emits updates.',
    }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Telemetry ingested successfully and alerts evaluated' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [telemetry_ingest_dto_1.TelemetryIngestDto]),
    __metadata("design:returntype", Promise)
], EnergyWaterController.prototype, "ingestTelemetry", null);
__decorate([
    (0, common_1.Get)('telemetry/history'),
    (0, swagger_1.ApiOperation)({
        summary: 'Get historical hourly generation, consumption, and storage metrics',
    }),
    (0, swagger_1.ApiQuery)({ name: 'hours', required: false, type: Number, description: 'Hours of history (1-24)' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Hourly telemetry data points' }),
    __param(0, (0, common_1.Query)('hours')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], EnergyWaterController.prototype, "getHistoricalTelemetry", null);
__decorate([
    (0, common_1.Get)('policy'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current homestead resource dispatch policy' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Active dispatch policy' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", dispatch_policy_dto_1.DispatchPolicyDto)
], EnergyWaterController.prototype, "getDispatchPolicy", null);
__decorate([
    (0, common_1.Post)('policy'),
    (0, swagger_1.ApiOperation)({
        summary: 'Update resource dispatch policy',
        description: 'Configure solar excess dump mode, rainwater priority routing, and battery safety floor reserve.',
    }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Updated dispatch policy' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dispatch_policy_dto_1.DispatchPolicyDto]),
    __metadata("design:returntype", dispatch_policy_dto_1.DispatchPolicyDto)
], EnergyWaterController.prototype, "updateDispatchPolicy", null);
__decorate([
    (0, common_1.Get)('dump-load/status'),
    (0, swagger_1.ApiOperation)({ summary: 'Get current status of automated excess solar dump loads' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Dump load operating status' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], EnergyWaterController.prototype, "getDumpLoadStatus", null);
exports.EnergyWaterController = EnergyWaterController = __decorate([
    (0, swagger_1.ApiTags)('Microgrid & Resource Telemetry'),
    (0, common_1.Controller)('microgrid'),
    __metadata("design:paramtypes", [energy_water_service_1.EnergyWaterService])
], EnergyWaterController);
