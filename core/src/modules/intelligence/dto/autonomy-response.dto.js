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
exports.AutonomyScoreResponseDto = exports.AutonomyMetricsBreakdownDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class AutonomyMetricsBreakdownDto {
}
exports.AutonomyMetricsBreakdownDto = AutonomyMetricsBreakdownDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 4200, description: 'Current daily calorie harvest rate (kcal/day)' }),
    __metadata("design:type", Number)
], AutonomyMetricsBreakdownDto.prototype, "dailyCaloriesProduced", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 5000, description: 'Homestead target daily calorie requirement (kcal/day)' }),
    __metadata("design:type", Number)
], AutonomyMetricsBreakdownDto.prototype, "dailyCalorieTarget", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 6850, description: 'Current rainwater storage across 4 cisterns (L)' }),
    __metadata("design:type", Number)
], AutonomyMetricsBreakdownDto.prototype, "cisternStorageLiters", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 20.1, description: 'Days of water autonomy remaining' }),
    __metadata("design:type", Number)
], AutonomyMetricsBreakdownDto.prototype, "waterAutonomyDays", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 22.4, description: 'Daily solar PV energy yield (kWh)' }),
    __metadata("design:type", Number)
], AutonomyMetricsBreakdownDto.prototype, "solarDailyGenerationKwh", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 18.4, description: 'Hours of battery autonomy at current homestead load' }),
    __metadata("design:type", Number)
], AutonomyMetricsBreakdownDto.prototype, "batteryAutonomyHours", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 96.6, description: 'Percentage of organic waste diverted from landfill (%)' }),
    __metadata("design:type", Number)
], AutonomyMetricsBreakdownDto.prototype, "wasteDivertedPercent", void 0);
class AutonomyScoreResponseDto {
}
exports.AutonomyScoreResponseDto = AutonomyScoreResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: 91.8, description: 'Composite homestead autonomy index (0 - 100)' }),
    __metadata("design:type", Number)
], AutonomyScoreResponseDto.prototype, "overallAutonomyScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 84.0, description: 'Food / Caloric self-sufficiency index (%)' }),
    __metadata("design:type", Number)
], AutonomyScoreResponseDto.prototype, "foodScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 94.5, description: 'Water self-sufficiency index (%)' }),
    __metadata("design:type", Number)
], AutonomyScoreResponseDto.prototype, "waterScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 96.8, description: 'Microgrid electrical self-sufficiency index (%)' }),
    __metadata("design:type", Number)
], AutonomyScoreResponseDto.prototype, "energyScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 96.6, description: 'Closed-loop biological circularity index (%)' }),
    __metadata("design:type", Number)
], AutonomyScoreResponseDto.prototype, "circularityScore", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'EXCELLENT', enum: ['EXCELLENT', 'GOOD', 'MODERATE', 'CRITICAL'] }),
    __metadata("design:type", String)
], AutonomyScoreResponseDto.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Detailed biological and physical telemetry metrics' }),
    __metadata("design:type", AutonomyMetricsBreakdownDto)
], AutonomyScoreResponseDto.prototype, "metrics", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: '2026-11-14T07:00:00.000Z' }),
    __metadata("design:type", String)
], AutonomyScoreResponseDto.prototype, "calculatedAt", void 0);
