export interface SolarStringTelemetry {
  timestamp: string;
  string1VoltageV: number;
  string1CurrentA: number;
  string2VoltageV: number;
  string2CurrentA: number;
  totalGenerationKw: number;
  ambientSolarIrradianceWPerM2: number;
}

export function computeDailySolarEfficiency(readings: SolarStringTelemetry[]): number {
  if (readings.length === 0) return 0;
  const avgKw = readings.reduce((sum, r) => sum + r.totalGenerationKw, 0) / readings.length;
  // Theoretical max 5.2 kWp
  return Math.round((avgKw / 5.2) * 100);
}
