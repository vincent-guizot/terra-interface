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
exports.RecordBsfFeedDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RecordBsfFeedDto {
}
exports.RecordBsfFeedDto = RecordBsfFeedDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'BAT-2026-BSF-08', description: 'BSF Batch Code' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RecordBsfFeedDto.prototype, "batchCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'tray-01', description: 'Target Tray Identifier' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RecordBsfFeedDto.prototype, "trayId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Kitchen Veg Scraps + Brewery Spent Grain',
        description: 'Substrate biomass composition',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RecordBsfFeedDto.prototype, "organicScrapType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4.5, description: 'Feed biomass weight in kilograms' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.1),
    __metadata("design:type", Number)
], RecordBsfFeedDto.prototype, "feedWeightKg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 68.0, description: 'Substrate moisture percentage (50-75%)', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], RecordBsfFeedDto.prototype, "moisturePercent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 35.5, description: 'Bed temperature in Celsius', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], RecordBsfFeedDto.prototype, "temperatureC", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'High moisture pre-fermented vegetable pulp', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RecordBsfFeedDto.prototype, "notes", void 0);
