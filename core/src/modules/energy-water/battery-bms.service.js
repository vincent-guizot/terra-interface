"use strict";

let BatteryBmsService = class BatteryBmsService {
  evaluatePackHealth(telemetry) {
    const isImbalanced = telemetry.maxCellDeltaV > 0.030;
    return {
      healthStatus: isImbalanced ? 'ACTIVE_BALANCING_TRIGGERED' : 'OPTIMAL',
      estimatedAutonomyHours: Math.round(telemetry.socPercent / 100 * 15.3 / 0.85 * 10) / 10,
      timestamp: new Date()
    };
  }
};
export default new BatteryBmsService(undefined);
export { BatteryBmsService };
