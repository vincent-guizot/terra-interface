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
exports.RecordMaggotHarvestDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RecordMaggotHarvestDto {
}
exports.RecordMaggotHarvestDto = RecordMaggotHarvestDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'BAT-2026-BSF-08', description: 'BSF Batch Code' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RecordMaggotHarvestDto.prototype, "batchCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'tray-01', description: 'Harvested Tray Identifier' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RecordMaggotHarvestDto.prototype, "trayId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 2.4, description: 'Live 5-instar prepupae weight in kilograms' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.01),
    __metadata("design:type", Number)
], RecordMaggotHarvestDto.prototype, "prepupaeYieldKg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4.8, description: 'Insect frass biofertilizer weight in kilograms' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], RecordMaggotHarvestDto.prototype, "frassYieldKg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 1.5, description: 'Live prepupae allocated to Zone 3 poultry', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], RecordMaggotHarvestDto.prototype, "allocatedToPoultryKg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0.9, description: 'Live prepupae allocated to Zone 2 bio-ponds', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], RecordMaggotHarvestDto.prototype, "allocatedToTilapiaKg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0.0, description: 'Prepupae dried or stored for pantry buffer', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], RecordMaggotHarvestDto.prototype, "allocatedToStorageKg", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Optimal dark prepupae crawl-off harvested at peak protein', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RecordMaggotHarvestDto.prototype, "notes", void 0);
