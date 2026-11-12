import { Injectable } from '@nestjs/common';

export interface WaterQualityReading {
  dissolvedOxygenMgL: number;
  pH: number;
  waterTempC: number;
  ammoniaPpm: number;
  nitratePpm: number;
}

@Injectable()
export class TilapiaTelemetryService {
  evaluateWaterQuality(reading: WaterQualityReading) {
    const alerts: string[] = [];
    if (reading.dissolvedOxygenMgL < 5.0) {
      alerts.push('CRITICAL: Dissolved oxygen below 5.0 mg/L. Auto-activating secondary aerator pump.');
    }
    if (reading.pH < 6.5 || reading.pH > 8.0) {
      alerts.push(`WARNING: pH out of optimal bounds (${reading.pH}). Buffer with agricultural lime or biochar.`);
    }
    if (reading.ammoniaPpm > 0.5) {
      alerts.push(`ELEVATED: Ammonia at ${reading.ammoniaPpm} ppm. Increase nitrifying filter flow.`);
    }

    return {
      status: alerts.length === 0 ? 'OPTIMAL' : 'ATTENTION_REQUIRED',
      alerts,
      evaluatedAt: new Date(),
    };
  }
}
