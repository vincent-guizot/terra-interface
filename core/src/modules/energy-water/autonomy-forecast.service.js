"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AutonomyForecastService = void 0;
const common_1 = require("@nestjs/common");
let AutonomyForecastService = class AutonomyForecastService {
    calculateWaterAutonomyDays(currentLiters, dailyConsumptionLiters, rainfallForecastLiters = 0) {
        const effectiveReserve = currentLiters + rainfallForecastLiters;
        return Math.round((effectiveReserve / Math.max(1, dailyConsumptionLiters)) * 10) / 10;
    }
    calculatePowerAutonomyHours(batteryKwh, currentSoc, hourlyHomesteadLoadKw) {
        const usableKwh = batteryKwh * (currentSoc / 100) * 0.9;
        return Math.round((usableKwh / Math.max(0.1, hourlyHomesteadLoadKw)) * 10) / 10;
    }
};
exports.AutonomyForecastService = AutonomyForecastService;
exports.AutonomyForecastService = AutonomyForecastService = __decorate([
    (0, common_1.Injectable)()
], AutonomyForecastService);
