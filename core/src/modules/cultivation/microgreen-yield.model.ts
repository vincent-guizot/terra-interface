export interface MicrogreenYieldModel {
  cropName: string;
  seedingDensityGramsPerTray: number;
  blackoutPeriodDays: number;
  lightExposureDays: number;
  estimatedFreshHarvestGrams: number;
  yieldMultiplierRatio: number; // harvested fresh weight / dry seed weight
}

export const standardMicrogreenCalibration: MicrogreenYieldModel[] = [
  {
    cropName: 'Sunflower (Black Oil)',
    seedingDensityGramsPerTray: 120,
    blackoutPeriodDays: 3,
    lightExposureDays: 7,
    estimatedFreshHarvestGrams: 750,
    yieldMultiplierRatio: 6.25,
  },
  {
    cropName: 'Speckled Pea Shoots',
    seedingDensityGramsPerTray: 180,
    blackoutPeriodDays: 3,
    lightExposureDays: 8,
    estimatedFreshHarvestGrams: 850,
    yieldMultiplierRatio: 4.72,
  },
  {
    cropName: 'Rambo Radish',
    seedingDensityGramsPerTray: 35,
    blackoutPeriodDays: 2,
    lightExposureDays: 6,
    estimatedFreshHarvestGrams: 380,
    yieldMultiplierRatio: 10.85,
  },
  {
    cropName: 'Calabrese Broccoli',
    seedingDensityGramsPerTray: 30,
    blackoutPeriodDays: 3,
    lightExposureDays: 7,
    estimatedFreshHarvestGrams: 300,
    yieldMultiplierRatio: 10.0,
  },
  {
    cropName: 'Hard Red Winter Wheatgrass',
    seedingDensityGramsPerTray: 150,
    blackoutPeriodDays: 2,
    lightExposureDays: 8,
    estimatedFreshHarvestGrams: 900,
    yieldMultiplierRatio: 6.0,
  },
];
