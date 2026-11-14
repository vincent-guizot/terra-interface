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
exports.NutrientDosingDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class NutrientDosingDto {
}
exports.NutrientDosingDto = NutrientDosingDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Target Electrical Conductivity in mS/cm', example: 1.8 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.1),
    __metadata("design:type", Number)
], NutrientDosingDto.prototype, "ecTarget", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Current measured Electrical Conductivity in mS/cm', example: 1.2 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], NutrientDosingDto.prototype, "currentEc", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Total reservoir nutrient solution volume in Liters', example: 200 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], NutrientDosingDto.prototype, "reservoirLiters", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Target solution pH', example: 6.0, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], NutrientDosingDto.prototype, "targetPh", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Current measured pH', example: 6.8, required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], NutrientDosingDto.prototype, "currentPh", void 0);
