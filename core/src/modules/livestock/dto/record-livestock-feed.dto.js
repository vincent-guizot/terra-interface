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
exports.RecordLivestockFeedDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RecordLivestockFeedDto {
}
exports.RecordLivestockFeedDto = RecordLivestockFeedDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Batch code or animal group ID', example: 'BAT-2026-LIV-01' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RecordLivestockFeedDto.prototype, "batchCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Feed type or formulation name', example: 'BSF Live Prepupae + Bran Mash' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RecordLivestockFeedDto.prototype, "feedType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Quantity fed in kg', example: 2.8 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.01),
    __metadata("design:type", Number)
], RecordLivestockFeedDto.prototype, "quantityKg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Portion of feed supplied from on-farm circular resources in % (0 - 100)', example: 65, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], RecordLivestockFeedDto.prototype, "circularPortionPercent", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Feeding time of day', example: 'Morning Ration (07:30)', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecordLivestockFeedDto.prototype, "feedTime", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Steward observations during feeding', example: 'High flock appetite, empty troughs in 12 mins', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecordLivestockFeedDto.prototype, "notes", void 0);
