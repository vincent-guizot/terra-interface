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
exports.CreateCropVarietyDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateCropVarietyDto {
}
exports.CreateCropVarietyDto = CreateCropVarietyDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Common plant variety name', example: 'Butterhead Lettuce (Rex)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCropVarietyDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Category (Leafy Greens, Herbs, Fruiting Vegetables, Microgreens, Fungi)', example: 'Leafy Greens' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateCropVarietyDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Scientific / botanical name', example: 'Lactuca sativa var. capitata', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCropVarietyDto.prototype, "scientificName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Target minimum EC in mS/cm', example: 1.2, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateCropVarietyDto.prototype, "targetEcMin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Target maximum EC in mS/cm', example: 1.8, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateCropVarietyDto.prototype, "targetEcMax", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Target minimum pH', example: 5.8, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateCropVarietyDto.prototype, "targetPhMin", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Target maximum pH', example: 6.5, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateCropVarietyDto.prototype, "targetPhMax", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Days to harvest maturity from transplant', example: 35, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], CreateCropVarietyDto.prototype, "daysToMaturity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Recommended growing medium/system', example: 'NFT_SOLUTION', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateCropVarietyDto.prototype, "growingMethod", void 0);
