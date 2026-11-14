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
exports.ZoneResponseDto = exports.BuildingDto = exports.FacilityDto = exports.EquipmentDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class EquipmentDto {
}
exports.EquipmentDto = EquipmentDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'eq-1' }),
    __metadata("design:type", String)
], EquipmentDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Resun LP-100 Air Pump' }),
    __metadata("design:type", String)
], EquipmentDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 100.0 }),
    __metadata("design:type", Number)
], EquipmentDto.prototype, "ratedPowerWatt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'OPERATIONAL' }),
    __metadata("design:type", String)
], EquipmentDto.prototype, "status", void 0);
class FacilityDto {
}
exports.FacilityDto = FacilityDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'fac-1' }),
    __metadata("design:type", String)
], FacilityDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bio-Pond Alpha' }),
    __metadata("design:type", String)
], FacilityDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'BIO_POND' }),
    __metadata("design:type", String)
], FacilityDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [EquipmentDto], required: false }),
    __metadata("design:type", Array)
], FacilityDto.prototype, "equipment", void 0);
class BuildingDto {
}
exports.BuildingDto = BuildingDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'bld-1' }),
    __metadata("design:type", String)
], BuildingDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Polycarbonate Greenhouse' }),
    __metadata("design:type", String)
], BuildingDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 29.25 }),
    __metadata("design:type", Number)
], BuildingDto.prototype, "footprintSqm", void 0);
class ZoneResponseDto {
}
exports.ZoneResponseDto = ZoneResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'z-1' }),
    __metadata("design:type", String)
], ZoneResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Z-01' }),
    __metadata("design:type", String)
], ZoneResponseDto.prototype, "code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Smart Micro-Greenhouse' }),
    __metadata("design:type", String)
], ZoneResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 35.0 }),
    __metadata("design:type", Number)
], ZoneResponseDto.prototype, "areaSqm", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CULTIVATION' }),
    __metadata("design:type", String)
], ZoneResponseDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '#10B981' }),
    __metadata("design:type", String)
], ZoneResponseDto.prototype, "colorHex", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [BuildingDto], required: false }),
    __metadata("design:type", Array)
], ZoneResponseDto.prototype, "buildings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [FacilityDto], required: false }),
    __metadata("design:type", Array)
], ZoneResponseDto.prototype, "facilities", void 0);
