"use strict";

let AutonomyForecastService = class AutonomyForecastService {
  calculateWaterAutonomyDays(currentLiters, dailyConsumptionLiters, rainfallForecastLiters = 0) {
    const effectiveReserve = currentLiters + rainfallForecastLiters;
    return Math.round(effectiveReserve / Math.max(1, dailyConsumptionLiters) * 10) / 10;
  }
  calculatePowerAutonomyHours(batteryKwh, currentSoc, hourlyHomesteadLoadKw) {
    const usableKwh = batteryKwh * (currentSoc / 100) * 0.9;
    return Math.round(usableKwh / Math.max(0.1, hourlyHomesteadLoadKw) * 10) / 10;
  }
};
export default new AutonomyForecastService(undefined);
export { AutonomyForecastService };
