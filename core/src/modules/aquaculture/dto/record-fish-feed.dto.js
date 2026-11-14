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
exports.RecordFishFeedDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RecordFishFeedDto {
}
exports.RecordFishFeedDto = RecordFishFeedDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Bio-Pond identifier or code', example: 'PND-01' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RecordFishFeedDto.prototype, "pondId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Feed type or formulation name', example: 'Duckweed (Fresh Lemna minor) + 32% CP Pellets' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RecordFishFeedDto.prototype, "feedType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Amount fed in grams', example: 650 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], RecordFishFeedDto.prototype, "amountGrams", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Observed feeding response', example: 'Aggressive / Surface Voracious', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecordFishFeedDto.prototype, "feedingBehavior", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Water temperature during feeding in Celsius', example: 27.0, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RecordFishFeedDto.prototype, "waterTemperatureC", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Notes on feed consumption or unconsumed residues', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecordFishFeedDto.prototype, "notes", void 0);
