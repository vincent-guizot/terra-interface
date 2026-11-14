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
exports.RecordWaterTestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RecordWaterTestDto {
}
exports.RecordWaterTestDto = RecordWaterTestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Bio-Pond identifier or code', example: 'PND-01' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RecordWaterTestDto.prototype, "pondId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Dissolved Oxygen in mg/L (Alert if < 5.0)', example: 6.2 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], RecordWaterTestDto.prototype, "dissolvedOxygenMgL", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Water pH (Optimal 6.5 - 8.0)', example: 7.2 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], RecordWaterTestDto.prototype, "pH", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Water temperature in Celsius', example: 26.5 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RecordWaterTestDto.prototype, "waterTempC", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total Ammonia Nitrogen (TAN / NH3) in ppm (Alert if > 0.5)', example: 0.15 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], RecordWaterTestDto.prototype, "ammoniaPpm", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nitrite (NO2-) in ppm (Alert if > 0.2)', example: 0.05, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], RecordWaterTestDto.prototype, "nitritePpm", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Nitrate (NO3-) in ppm', example: 25.0, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], RecordWaterTestDto.prototype, "nitratePpm", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Observations or physical water clarity notes', example: 'Water green with rich micro-algae, no surface piping observed', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecordWaterTestDto.prototype, "notes", void 0);
