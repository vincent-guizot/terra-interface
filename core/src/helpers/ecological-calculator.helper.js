"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcologicalCalculator = void 0;
class EcologicalCalculator {
    static calculateHenDayRate(eggsCollected, totalHens) {
        if (totalHens <= 0)
            return 0;
        return Math.round((eggsCollected / totalHens) * 1000) / 10;
    }
    static calculateFcr(feedConsumedKg, biomassGainKg) {
        if (biomassGainKg <= 0)
            return 0;
        return Math.round((feedConsumedKg / biomassGainKg) * 100) / 100;
    }
    static calculateBsfEfficiency(prepupaeKg, wasteInputKg) {
        if (wasteInputKg <= 0)
            return 0;
        return Math.round((prepupaeKg / wasteInputKg) * 1000) / 10;
    }
    static calculateRainwaterVolume(rainfallMm, roofAreaSqm = 140, runoffCoefficient = 0.85) {
        return Math.round(rainfallMm * roofAreaSqm * runoffCoefficient);
    }
    static calculateBatteryAutonomyHours(batteryCapacityKwh = 15.3, socPercent = 91, hourlyLoadKw = 0.75, maxDodFactor = 0.90) {
        if (hourlyLoadKw <= 0)
            return 0;
        const usableEnergy = batteryCapacityKwh * (socPercent / 100) * maxDodFactor;
        return Math.round((usableEnergy / hourlyLoadKw) * 10) / 10;
    }
    static calculateWaterAutonomyDays(currentLiters, dailyConsumptionLiters = 340) {
        if (dailyConsumptionLiters <= 0)
            return 0;
        return Math.round((currentLiters / dailyConsumptionLiters) * 10) / 10;
    }
}
exports.EcologicalCalculator = EcologicalCalculator;
