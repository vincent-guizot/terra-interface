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
exports.RecordBatchEventDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class RecordBatchEventDto {
}
exports.RecordBatchEventDto = RecordBatchEventDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'OBSERVATION',
        enum: ['FEEDING', 'OBSERVATION', 'TREATMENT', 'MORTALITY', 'WATER_TEST', 'PRUNING', 'EC_CALIBRATION'],
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], RecordBatchEventDto.prototype, "eventType", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: { note: 'Leaves showing deep emerald green, no signs of tip burn', ec: 1.62, ph: 6.1 },
        description: 'Dynamic event payload payload structured as JSON',
    }),
    __metadata("design:type", Object)
], RecordBatchEventDto.prototype, "data", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ example: 'Vincent' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RecordBatchEventDto.prototype, "recordedBy", void 0);
