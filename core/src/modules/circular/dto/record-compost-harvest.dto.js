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
exports.RecordCompostHarvestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RecordCompostHarvestDto {
}
exports.RecordCompostHarvestDto = RecordCompostHarvestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'BAT-2026-CMP-12', description: 'Compost Batch Code' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RecordCompostHarvestDto.prototype, "batchCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bay 1', description: 'Compost Bay Identifier' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RecordCompostHarvestDto.prototype, "bayNumber", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 120.0, description: 'Cured mature humus compost yield in kilograms' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.1),
    __metadata("design:type", Number)
], RecordCompostHarvestDto.prototype, "curedHumusKg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 96.0, description: 'Solvita / Soluble maturity score index (0-100%)', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], RecordCompostHarvestDto.prototype, "curedMaturityScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Zone 4 Permaculture Raised Beds',
        description: 'Target application destination',
        required: false,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RecordCompostHarvestDto.prototype, "destination", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Dark brown, rich crumbly humus with zero foul odors', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RecordCompostHarvestDto.prototype, "notes", void 0);
