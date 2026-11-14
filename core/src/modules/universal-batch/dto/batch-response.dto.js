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
exports.BatchResponseDto = exports.BatchAuditLogResponseDto = exports.BatchOutputResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class BatchOutputResponseDto {
}
exports.BatchOutputResponseDto = BatchOutputResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'out-uuid-1' }),
    __metadata("design:type", String)
], BatchOutputResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Fresh Bok Choy Grade A' }),
    __metadata("design:type", String)
], BatchOutputResponseDto.prototype, "productName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 14.5 }),
    __metadata("design:type", Number)
], BatchOutputResponseDto.prototype, "quantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'kg' }),
    __metadata("design:type", String)
], BatchOutputResponseDto.prototype, "measurementUnit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Grade A' }),
    __metadata("design:type", String)
], BatchOutputResponseDto.prototype, "qualityGrade", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-11-12T07:15:00.000Z' }),
    __metadata("design:type", Date)
], BatchOutputResponseDto.prototype, "harvestDate", void 0);
class BatchAuditLogResponseDto {
}
exports.BatchAuditLogResponseDto = BatchAuditLogResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'audit-uuid-1' }),
    __metadata("design:type", String)
], BatchAuditLogResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'First Cut Harvest Recorded' }),
    __metadata("design:type", String)
], BatchAuditLogResponseDto.prototype, "action", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Vincent' }),
    __metadata("design:type", String)
], BatchAuditLogResponseDto.prototype, "performedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-11-12T07:15:00.000Z' }),
    __metadata("design:type", Date)
], BatchAuditLogResponseDto.prototype, "timestamp", void 0);
class BatchResponseDto {
}
exports.BatchResponseDto = BatchResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'batch-uuid-101' }),
    __metadata("design:type", String)
], BatchResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'BAT-2026-CUL-01' }),
    __metadata("design:type", String)
], BatchResponseDto.prototype, "batchCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Spring Greenhouse Bok Choy NFT' }),
    __metadata("design:type", String)
], BatchResponseDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'CULTIVATION' }),
    __metadata("design:type", String)
], BatchResponseDto.prototype, "domain", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'ACTIVE' }),
    __metadata("design:type", String)
], BatchResponseDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 120.0 }),
    __metadata("design:type", Number)
], BatchResponseDto.prototype, "initialQuantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 95.0 }),
    __metadata("design:type", Number)
], BatchResponseDto.prototype, "currentQuantity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'heads' }),
    __metadata("design:type", String)
], BatchResponseDto.prototype, "measurementUnit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [BatchOutputResponseDto] }),
    __metadata("design:type", Array)
], BatchResponseDto.prototype, "outputs", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: [BatchAuditLogResponseDto] }),
    __metadata("design:type", Array)
], BatchResponseDto.prototype, "auditLogs", void 0);
