export interface MicroclimateForecast {
  locationCoordinates: { lat: number; lng: number }; // West Java, ID
  forecastTime: string;
  expectedRainfallMm: number;
  probabilityOfPrecipitationPercent: number;
  peakRainWindow: string;
  expectedRoofCatchmentLiters: number; // based on 140 m2 catchment
}

export function estimateRainCatchmentVolume(rainfallMm: number, roofAreaSqm: number = 140, runoffCoefficient: number = 0.85): number {
  // Volume (L) = Rain (mm) * Area (m2) * Runoff Coefficient
  return Math.round(rainfallMm * roofAreaSqm * runoffCoefficient);
}
