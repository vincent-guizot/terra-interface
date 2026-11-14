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
exports.RecordStockMovementDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
class RecordStockMovementDto {
}
exports.RecordStockMovementDto = RecordStockMovementDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'inv-1', description: 'Internal inventory item ID', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RecordStockMovementDto.prototype, "itemId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SKU-FEE-01', description: 'Item SKU identifier', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RecordStockMovementDto.prototype, "sku", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: client_1.StockMovementType,
        example: client_1.StockMovementType.FEEDING_OUT,
        description: 'Immutable ledger movement classification',
    }),
    (0, class_validator_1.IsEnum)(client_1.StockMovementType),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RecordStockMovementDto.prototype, "type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: -2.5,
        description: 'Signed quantity delta (+ for additions, - for deductions)',
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], RecordStockMovementDto.prototype, "quantityDelta", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'kg', description: 'Unit of measurement' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RecordStockMovementDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'BAT-2026-LIV-01', description: 'Associated batch code', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RecordStockMovementDto.prototype, "referenceBatchCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Vincent', description: 'Steward responsible for the transaction', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RecordStockMovementDto.prototype, "stewardName", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Afternoon feeding ration dispensed to poultry coop', required: false }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], RecordStockMovementDto.prototype, "notes", void 0);
