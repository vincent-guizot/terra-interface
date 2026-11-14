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
exports.RecordMortalityDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RecordMortalityDto {
}
exports.RecordMortalityDto = RecordMortalityDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Batch code of animal group', example: 'BAT-2026-LIV-01' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RecordMortalityDto.prototype, "batchCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Number of head lost', example: 1 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], RecordMortalityDto.prototype, "count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Suspected cause of mortality', example: 'Heat stress / Egg bound' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RecordMortalityDto.prototype, "suspectedCause", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Disposal method', example: 'Bokashi Deep Pit / Pyrolysis Inoculation', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecordMortalityDto.prototype, "disposalMethod", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Steward autopsy notes', required: false }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecordMortalityDto.prototype, "notes", void 0);
