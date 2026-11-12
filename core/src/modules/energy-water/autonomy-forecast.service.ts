import { Injectable } from '@nestjs/common';

@Injectable()
export class AutonomyForecastService {
  calculateWaterAutonomyDays(currentLiters: number, dailyConsumptionLiters: number, rainfallForecastLiters: number = 0) {
    const effectiveReserve = currentLiters + rainfallForecastLiters;
    return Math.round((effectiveReserve / Math.max(1, dailyConsumptionLiters)) * 10) / 10;
  }

  calculatePowerAutonomyHours(batteryKwh: number, currentSoc: number, hourlyHomesteadLoadKw: number) {
    const usableKwh = batteryKwh * (currentSoc / 100) * 0.9; // 90% DoD safe margin
    return Math.round((usableKwh / Math.max(0.1, hourlyHomesteadLoadKw)) * 10) / 10;
  }
}
