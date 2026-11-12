import { Injectable } from '@nestjs/common';

export interface BmsTelemetry {
  packVoltageV: number;
  packCurrentA: number;
  socPercent: number;
  cellVoltagesV: number[]; // 16 cells for 48V nominal LiFePO4
  maxCellDeltaV: number;
  temperatureC: number;
  cycleCount: number;
}

@Injectable()
export class BatteryBmsService {
  evaluatePackHealth(telemetry: BmsTelemetry) {
    const isImbalanced = telemetry.maxCellDeltaV > 0.030; // >30mV delta indicates balancing required
    return {
      healthStatus: isImbalanced ? 'ACTIVE_BALANCING_TRIGGERED' : 'OPTIMAL',
      estimatedAutonomyHours: Math.round((telemetry.socPercent / 100) * 15.3 / 0.85 * 10) / 10,
      timestamp: new Date(),
    };
  }
}
