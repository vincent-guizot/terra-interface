import { Injectable } from '@nestjs/common';

export interface MaggotHarvestRecord {
  harvestDate: string;
  trayId: string;
  freshPrepupaeKg: number;
  crudeProteinPercent: number; // typically 40 - 44%
  allocatedToPoultryKg: number;
  allocatedToTilapiaKg: number;
  dryResidueFrassKg: number;
}

@Injectable()
export class MaggotHarvestService {
  logDailyHarvest(trayId: string, yieldKg: number, frassKg: number): MaggotHarvestRecord {
    const poultryShare = Math.round(yieldKg * 0.65 * 100) / 100;
    const tilapiaShare = Math.round((yieldKg - poultryShare) * 100) / 100;

    return {
      harvestDate: new Date().toISOString().split('T')[0],
      trayId,
      freshPrepupaeKg: yieldKg,
      crudeProteinPercent: 42.4,
      allocatedToPoultryKg: poultryShare,
      allocatedToTilapiaKg: tilapiaShare,
      dryResidueFrassKg: frassKg,
    };
  }
}
