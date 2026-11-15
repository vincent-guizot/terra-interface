"use strict";

let TilapiaTelemetryService = class TilapiaTelemetryService {
  evaluateWaterQuality(reading) {
    const alerts = [];
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
      evaluatedAt: new Date()
    };
  }
};
export default new TilapiaTelemetryService(undefined);
export { TilapiaTelemetryService };
