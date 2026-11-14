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
exports.AttachCompostDetailDto = exports.AttachBsfDetailDto = exports.AttachAquacultureDetailDto = exports.AttachLivestockDetailDto = exports.AttachCultivationDetailDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class AttachCultivationDetailDto {
}
exports.AttachCultivationDetailDto = AttachCultivationDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'NFT_SOLUTION', enum: ['NFT_SOLUTION', 'LIVING_SOIL', 'SAWDUST_BAGLOG', 'DWC'] }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AttachCultivationDetailDto.prototype, "growingMedium", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'NATURAL_SUNLIGHT' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AttachCultivationDetailDto.prototype, "lightingType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 1.6, description: 'Target EC in mS/cm' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AttachCultivationDetailDto.prototype, "ecTarget", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 6.2, description: 'Target pH' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AttachCultivationDetailDto.prototype, "phTarget", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 4, description: 'Number of vertical NFT channels occupied' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AttachCultivationDetailDto.prototype, "trayCount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Channel-A1' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AttachCultivationDetailDto.prototype, "bedNumber", void 0);
class AttachLivestockDetailDto {
}
exports.AttachLivestockDetailDto = AttachLivestockDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Ayam KUB' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AttachLivestockDetailDto.prototype, "breed", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'DEEP_LITTER_COOP', enum: ['DEEP_LITTER_COOP', 'MOBILE_TRACTOR', 'ELEVATED_SLAT'] }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AttachLivestockDetailDto.prototype, "housingSystem", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 0 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], AttachLivestockDetailDto.prototype, "mortalityCount", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 2.1, description: 'Feed Conversion Ratio target' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AttachLivestockDetailDto.prototype, "targetFcr", void 0);
class AttachAquacultureDetailDto {
}
exports.AttachAquacultureDetailDto = AttachAquacultureDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Oreochromis niloticus (Tilapia)' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AttachAquacultureDetailDto.prototype, "species", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 12.0, description: 'Tank volume in m³' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.1),
    __metadata("design:type", Number)
], AttachAquacultureDetailDto.prototype, "pondVolumeM3", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 25.0, description: 'Max stocking density in kg/m³' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AttachAquacultureDetailDto.prototype, "targetDensityKgM3", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'VENTURI_AND_DIFFUSER' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], AttachAquacultureDetailDto.prototype, "aerationType", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 5.0, description: 'Minimum Dissolved Oxygen in mg/L' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AttachAquacultureDetailDto.prototype, "dissolvedOxygenMin", void 0);
class AttachBsfDetailDto {
}
exports.AttachBsfDetailDto = AttachBsfDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'KITCHEN_SCRAPS', enum: ['KITCHEN_SCRAPS', 'POND_SEDIMENT', 'BREWER_GRAINS'] }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AttachBsfDetailDto.prototype, "substrateType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 45.0, description: 'Wet substrate weight in kg' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.5),
    __metadata("design:type", Number)
], AttachBsfDetailDto.prototype, "substrateWeightKg", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 5, description: 'Stacked bioconversion trays' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AttachBsfDetailDto.prototype, "trayCount", void 0);
class AttachCompostDetailDto {
}
exports.AttachCompostDetailDto = AttachCompostDetailDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bay 1', enum: ['Bay 1', 'Bay 2', 'Bay 3'] }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], AttachCompostDetailDto.prototype, "bayNumber", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 30.0, description: 'Initial C:N ratio' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AttachCompostDetailDto.prototype, "carbonNitrogenRatio", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 10.0, description: 'Biochar inoculation percentage' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], AttachCompostDetailDto.prototype, "biocharPercent", void 0);
