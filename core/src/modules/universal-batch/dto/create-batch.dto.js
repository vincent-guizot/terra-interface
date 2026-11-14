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
exports.CreateBatchDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateBatchDto {
}
exports.CreateBatchDto = CreateBatchDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'BAT-2026-CUL-01',
        description: 'Unique structured batch code',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBatchDto.prototype, "batchCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'Spring Greenhouse Bok Choy NFT',
        description: 'Operational title of the batch',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBatchDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'CULTIVATION',
        enum: ['CULTIVATION', 'LIVESTOCK', 'AQUACULTURE', 'CIRCULAR'],
        description: 'Biological production domain',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBatchDto.prototype, "domain", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'uuid-zone-1',
        description: 'Assigned 300 m² zone ID',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBatchDto.prototype, "zoneId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '2026-11-12T08:00:00.000Z',
        description: 'Start or transplanting date',
    }),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateBatchDto.prototype, "startDate", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: '2026-12-20T17:00:00.000Z',
        description: 'Projected completion or final harvest date',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", String)
], CreateBatchDto.prototype, "expectedEndDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 120,
        description: 'Initial quantity placed into production',
    }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateBatchDto.prototype, "initialQuantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'heads',
        description: 'Measurement unit (kg, pcs, heads, fingerlings, birds)',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateBatchDto.prototype, "measurementUnit", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Automated 15-minute NFT nutrient film stream. Zero pest pressure detected.',
        description: 'Steward notes and operational parameters',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateBatchDto.prototype, "notes", void 0);
