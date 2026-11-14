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
exports.AssistantQueryResponseDto = exports.QueryAssistantDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class QueryAssistantDto {
}
exports.QueryAssistantDto = QueryAssistantDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'How is the nitrogen balance in Pond Alpha and NFT beds?',
        description: 'Natural language steward query regarding homestead operations or permaculture biology',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], QueryAssistantDto.prototype, "query", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'vincent-session-01',
        description: 'Optional conversation session identifier for audit trail',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryAssistantDto.prototype, "sessionId", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Cultivation & Aquaculture',
        description: 'Optional operational context focus',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], QueryAssistantDto.prototype, "context", void 0);
class AssistantQueryResponseDto {
}
exports.AssistantQueryResponseDto = AssistantQueryResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Nutrient loop status: Zone 2 biofilter is converting 94% of ammonia into nitrates...' }),
    __metadata("design:type", String)
], AssistantQueryResponseDto.prototype, "reply", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'Nitrogen Cycling' }),
    __metadata("design:type", String)
], AssistantQueryResponseDto.prototype, "intentCategory", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: ['Zone 2: Aquaponics Greenhouse', 'Zone 4: Permaculture Beds'] }),
    __metadata("design:type", Array)
], AssistantQueryResponseDto.prototype, "relatedZones", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 0.94 }),
    __metadata("design:type", Number)
], AssistantQueryResponseDto.prototype, "confidenceScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-11-14T07:00:00.000Z' }),
    __metadata("design:type", String)
], AssistantQueryResponseDto.prototype, "timestamp", void 0);
