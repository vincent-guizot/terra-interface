"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.estimateRainCatchmentVolume = estimateRainCatchmentVolume;
exports.generateWestJavaForecast = generateWestJavaForecast;
function estimateRainCatchmentVolume(rainfallMm, roofAreaSqm = 140, runoffCoefficient = 0.85) {
    return Math.round(rainfallMm * roofAreaSqm * runoffCoefficient);
}
function generateWestJavaForecast() {
    const now = new Date();
    const currentHour = now.getHours();
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
