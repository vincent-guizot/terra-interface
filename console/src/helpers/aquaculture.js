export function getWaterQualityAlerts(data) {
  const alerts = [];
  if (data.dissolvedOxygenMgL < 5.0) alerts.push('CRITICAL: Dissolved oxygen below 5.0 mg/L.');
  if (data.pH < 6.5 || data.pH > 8.0) alerts.push(`WARNING: pH out of optimal bounds (${data.pH}).`);
  if (data.ammoniaPpm > 0.5) alerts.push(`ELEVATED: Ammonia at ${data.ammoniaPpm} ppm.`);
  return alerts;
}
