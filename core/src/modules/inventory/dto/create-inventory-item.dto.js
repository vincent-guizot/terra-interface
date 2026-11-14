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
exports.CreateInventoryItemDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateInventoryItemDto {
}
exports.CreateInventoryItemDto = CreateInventoryItemDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'SKU-BIO-02', description: 'Unique Stock Keeping Unit' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInventoryItemDto.prototype, "sku", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Bokashi Bran Mother Culture', description: 'Item name' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInventoryItemDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Biologicals', description: 'Item category' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInventoryItemDto.prototype, "category", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'loc-4', description: 'Storage Location UUID or code' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInventoryItemDto.prototype, "locationId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'kg', description: 'Measurement unit' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreateInventoryItemDto.prototype, "unit", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5.0, description: 'Minimum reorder threshold' }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], CreateInventoryItemDto.prototype, "minThreshold", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 10.0, description: 'Initial stock quantity', required: false }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], CreateInventoryItemDto.prototype, "initialStock", void 0);
