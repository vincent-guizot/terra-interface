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
exports.PlantDiagnosisResponseDto = exports.DiagnosePlantDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class DiagnosePlantDto {
}
exports.DiagnosePlantDto = DiagnosePlantDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Lower Old Leaves',
        enum: ['Lower Old Leaves', 'Upper Young Leaves', 'Entire Plant'],
        description: 'Plant canopy zone where chlorosis or deficiency symptom is observed',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(['Lower Old Leaves', 'Upper Young Leaves', 'Entire Plant']),
    __metadata("design:type", String)
], DiagnosePlantDto.prototype, "leafZone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Interveinal Yellowing',
        enum: ['Interveinal Yellowing', 'Marginal Scorching', 'Uniform Pale Yellow'],
        description: 'Specific chlorosis pattern observed on the foliage',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsIn)(['Interveinal Yellowing', 'Marginal Scorching', 'Uniform Pale Yellow']),
    __metadata("design:type", String)
], DiagnosePlantDto.prototype, "chlorosisType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Indeterminate Tomatoes',
        description: 'Crop variety or species under inspection',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], DiagnosePlantDto.prototype, "cropType", void 0);
class PlantDiagnosisResponseDto {
}
exports.PlantDiagnosisResponseDto = PlantDiagnosisResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Magnesium (Mg)' }),
    __metadata("design:type", String)
], PlantDiagnosisResponseDto.prototype, "probableDeficiency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Foliar spray of 1% Epsom salt (magnesium sulfate) or fermented banana stem juice.' }),
    __metadata("design:type", String)
], PlantDiagnosisResponseDto.prototype, "organicHomesteadRemedy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'High' }),
    __metadata("design:type", String)
], PlantDiagnosisResponseDto.prototype, "urgency", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Zone 4: Permaculture Beds' }),
    __metadata("design:type", String)
], PlantDiagnosisResponseDto.prototype, "recommendedTargetZone", void 0);
