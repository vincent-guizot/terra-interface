export interface DumpLoadPolicy {
  batterySocThresholdPercent: number; // e.g. 90%
  minExcessSolarKw: number;           // e.g. 1.2 kW
  targetLoadAppliance: 'DEEP_WELL_PUMP' | 'MUSHROOM_DEHYDRATOR' | 'POND_CASCADE_AERATOR';
  maxContinuousRunMinutes: number;
}

export const activeDumpLoadPolicy: DumpLoadPolicy = {
  batterySocThresholdPercent: 90.0,
  minExcessSolarKw: 1.4,
  targetLoadAppliance: 'DEEP_WELL_PUMP',
  maxContinuousRunMinutes: 45,
};
