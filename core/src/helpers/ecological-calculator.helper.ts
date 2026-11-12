// Terra Interface — Ecological & Biotechnical Helper Algorithms

export class EcologicalCalculator {
  /**
   * Hen-Day Egg Production Rate (%): (Total eggs / Total active hens) * 100
   */
  static calculateHenDayRate(eggsCollected: number, totalHens: number): number {
    if (totalHens <= 0) return 0;
    return Math.round((eggsCollected / totalHens) * 1000) / 10;
  }

  /**
   * Feed Conversion Ratio (FCR): Total Feed Consumed (kg) / Total Biomass Gain (kg)
   */
  static calculateFcr(feedConsumedKg: number, biomassGainKg: number): number {
    if (biomassGainKg <= 0) return 0;
    return Math.round((feedConsumedKg / biomassGainKg) * 100) / 100;
  }

  /**
   * BSF Feed Conversion Efficiency (%): (Harvested live prepupae kg / Total organic waste kg) * 100
   */
  static calculateBsfEfficiency(prepupaeKg: number, wasteInputKg: number): number {
    if (wasteInputKg <= 0) return 0;
    return Math.round((prepupaeKg / wasteInputKg) * 1000) / 10;
  }

  /**
   * Rainwater Harvest Yield (Liters): Rainfall (mm) * Roof Catchment (m²) * Runoff Coefficient
   */
  static calculateRainwaterVolume(rainfallMm: number, roofAreaSqm: number = 140, runoffCoefficient: number = 0.85): number {
    return Math.round(rainfallMm * roofAreaSqm * runoffCoefficient);
  }

  /**
   * Solar Battery Autonomy (Hours): (Battery Capacity kWh * SoC % * DoD Factor) / Hourly Load kW
   */
  static calculateBatteryAutonomyHours(
    batteryCapacityKwh: number = 15.3,
    socPercent: number = 91,
    hourlyLoadKw: number = 0.75,
    maxDodFactor: number = 0.90
  ): number {
    if (hourlyLoadKw <= 0) return 0;
    const usableEnergy = batteryCapacityKwh * (socPercent / 100) * maxDodFactor;
    return Math.round((usableEnergy / hourlyLoadKw) * 10) / 10;
  }

  /**
   * Cistern Water Autonomy (Days): Current Storage Liters / Daily Consumption Liters
   */
  static calculateWaterAutonomyDays(currentLiters: number, dailyConsumptionLiters: number = 340): number {
    if (dailyConsumptionLiters <= 0) return 0;
    return Math.round((currentLiters / dailyConsumptionLiters) * 10) / 10;
  }
}
