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
exports.TransitionBatchStatusDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const universal_batch_service_1 = require("../universal-batch.service");
class TransitionBatchStatusDto {
}
exports.TransitionBatchStatusDto = TransitionBatchStatusDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        enum: universal_batch_service_1.BatchStatus,
        example: universal_batch_service_1.BatchStatus.COMPLETED,
        description: 'New universal lifecycle state (DRAFT -> PLANNED -> ACTIVE -> ON_HOLD -> COMPLETED / CANCELLED)',
    }),
    (0, class_validator_1.IsEnum)(universal_batch_service_1.BatchStatus),
    __metadata("design:type", String)
], TransitionBatchStatusDto.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        example: 'Final selective harvest concluded. Yield target achieved at 94.5%.',
        description: 'Reason for the state transition for audit logging',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TransitionBatchStatusDto.prototype, "reason", void 0);
