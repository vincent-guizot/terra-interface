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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelemetryIngestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class TelemetryIngestDto {
}
exports.TelemetryIngestDto = TelemetryIngestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ESP32-ZONE-05-ENERGY', description: 'Originating microcontroller probe ID' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], TelemetryIngestDto.prototype, "sensorDeviceId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4.25, description: 'Current Solar PV Generation in Kilowatts (kW)' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], TelemetryIngestDto.prototype, "solarGenerationKw", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 850, description: 'Homestead AC Load Consumption in Watts (W)' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], TelemetryIngestDto.prototype, "inverterLoadWatts", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 88.5, description: 'LiFePO4 Battery State of Charge (SoC %)' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    (0, class_validator_1.Max)(100),
    __metadata("design:type", Number)
], TelemetryIngestDto.prototype, "batterySoC", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 53.4, description: 'Battery Bank Voltage in Volts (V)', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TelemetryIngestDto.prototype, "batteryVoltage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 28.5, description: 'Net Battery Pack Current in Amperes (A)', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TelemetryIngestDto.prototype, "batteryCurrentAmps", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10400, description: 'Total Rainwater Storage Buffer in Liters (L)' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], TelemetryIngestDto.prototype, "cisternLevelLiters", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 6.8, description: 'Bio-pond Dissolved Oxygen in mg/L', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TelemetryIngestDto.prototype, "dissolvedOxygenMgL", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 7.2, description: 'Water pH reading', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TelemetryIngestDto.prototype, "pH", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 26.5, description: 'Water temperature in Celsius (°C)', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TelemetryIngestDto.prototype, "waterTemperatureC", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 780, description: 'Ambient Solar Irradiance in W/m²', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], TelemetryIngestDto.prototype, "ambientIrradianceWPerM2", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-11-13T15:00:00Z', description: 'Telemetry timestamp ISO8601', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], TelemetryIngestDto.prototype, "timestamp", void 0);
