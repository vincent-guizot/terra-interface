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
exports.DispatchPolicyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class DispatchPolicyDto {
}
exports.DispatchPolicyDto = DispatchPolicyDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'EVAPORATIVE_MISTING',
        description: 'Solar excess dump load dispatch target',
        enum: ['EVAPORATIVE_MISTING', 'WATER_HEATER', 'POND_CASCADE_AERATOR', 'BATTERY_STORAGE_ONLY'],
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DispatchPolicyDto.prototype, "solarDumpMode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'AQUAPONICS_FIRST',
        description: 'Rainwater routing priority allocation',
        enum: ['AQUAPONICS_FIRST', 'LIVING_SOIL_FIRST', 'DOMESTIC_FIRST', 'BALANCED'],
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], DispatchPolicyDto.prototype, "rainwaterPriority", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 20.0,
        description: 'Minimum Battery SoC reserve floor percentage for non-essential load shedding',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(10),
    (0, class_validator_1.Max)(50),
    __metadata("design:type", Number)
], DispatchPolicyDto.prototype, "batteryFloorReservePercent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Vincent', description: 'Steward applying the dispatch policy', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DispatchPolicyDto.prototype, "stewardName", void 0);
