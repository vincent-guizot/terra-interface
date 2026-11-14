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
exports.RecordCompostTurnDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RecordCompostTurnDto {
}
exports.RecordCompostTurnDto = RecordCompostTurnDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'BAT-2026-CMP-12', description: 'Compost Batch Code' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RecordCompostTurnDto.prototype, "batchCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bay 1', description: 'Compost Bay Identifier (Bay 1, Bay 2, Bay 3)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RecordCompostTurnDto.prototype, "bayNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 62.5, description: 'Core pile temperature in Celsius' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RecordCompostTurnDto.prototype, "coreTempC", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 46.0, description: 'Edge pile temperature in Celsius' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RecordCompostTurnDto.prototype, "edgeTempC", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 27.5, description: 'Ambient outdoor air temperature in Celsius' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RecordCompostTurnDto.prototype, "ambientTempC", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 3, description: 'Aerobic aeration turn iteration count' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], RecordCompostTurnDto.prototype, "turnCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 55.0, description: 'Pile moisture percentage (target 50-60%)' }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RecordCompostTurnDto.prototype, "moisturePercent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5.0, description: 'Activated biochar addition in kilograms', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], RecordCompostTurnDto.prototype, "biocharAddedKg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10.0, description: 'Water or compost tea added to hydrate pile in Liters', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], RecordCompostTurnDto.prototype, "waterAddedLiters", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Active thermophilic stage reached; pleasant earthy aroma', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RecordCompostTurnDto.prototype, "notes", void 0);
