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
exports.RecordEggHarvestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RecordEggHarvestDto {
}
exports.RecordEggHarvestDto = RecordEggHarvestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Batch code or ID of the layer flock', example: 'BAT-2026-LIV-01' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecordEggHarvestDto.prototype, "batchCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total eggs collected today', example: 21 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], RecordEggHarvestDto.prototype, "eggsCollected", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Count of Grade A table eggs', example: 19, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], RecordEggHarvestDto.prototype, "gradeACount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Count of cracked or broken eggs', example: 1, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], RecordEggHarvestDto.prototype, "crackedCount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Average egg weight in grams', example: 45.2, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RecordEggHarvestDto.prototype, "averageEggWeightGrams", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Flock size (total active hens)', example: 24, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], RecordEggHarvestDto.prototype, "totalHens", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Steward notes', example: 'Clean shells, strong calcium luster', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecordEggHarvestDto.prototype, "notes", void 0);
