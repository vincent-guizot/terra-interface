export interface MicroclimateForecast {
  locationCoordinates: { lat: number; lng: number }; // West Java, ID (-6.9147, 107.6098)
  forecastTime: string;
  expectedRainfallMm: number;
  probabilityOfPrecipitationPercent: number;
  peakRainWindow: string;
  expectedRoofCatchmentLiters: number; // based on 140 m2 catchment
  ambientTempC: number;
  relativeHumidityPercent: number;
  solarIrradianceWpm2: number;
  advisory: string;
}

export function estimateRainCatchmentVolume(
  rainfallMm: number,
  roofAreaSqm: number = 140,
  runoffCoefficient: number = 0.85
): number {
  // Volume (L) = Rain (mm) * Area (m2) * Runoff Coefficient
  return Math.round(rainfallMm * roofAreaSqm * runoffCoefficient);
}

export function generateWestJavaForecast(): MicroclimateForecast {
  const now = new Date();
  const currentHour = now.getHours();

  // Tropical West Java diurnal cycle: Afternoon monsoon shower (15:00 - 18:30)
  const isRainApproaching = currentHour >= 14 && currentHour <= 19;
  const expectedRainfallMm = isRainApproaching ? 18.0 : 4.5;
  const probPercent = isRainApproaching ? 85 : 35;
  const peakWindow = isRainApproaching ? '17:00 - 18:30' : 'Tomorrow 16:00 - 18:00';
  const catchment = estimateRainCatchmentVolume(expectedRainfallMm, 140, 0.85);

  return {
    locationCoordinates: { lat: -6.9147, lng: 107.6098 },
    forecastTime: now.toISOString(),
    expectedRainfallMm,
    probabilityOfPrecipitationPercent: probPercent,
    peakRainWindow: peakWindow,
    expectedRoofCatchmentLiters: catchment,
    ambientTempC: isRainApproaching ? 26.5 : 29.8,
    relativeHumidityPercent: isRainApproaching ? 88 : 72,
    solarIrradianceWpm2: currentHour >= 6 && currentHour <= 17 ? 680 : 0,
    advisory: isRainApproaching
      ? 'Tropical orographic monsoon approaching. Secure loose nursery cloches and verify cistern inlet filters.'
      : 'Clear sky conditions favorable for solar harvest and crop dehydration.',
  };
}
