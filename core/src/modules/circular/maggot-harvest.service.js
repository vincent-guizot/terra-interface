"use strict";

let MaggotHarvestService = class MaggotHarvestService {
  logDailyHarvest(trayId, yieldKg, frassKg) {
    const poultryShare = Math.round(yieldKg * 0.65 * 100) / 100;
    const tilapiaShare = Math.round((yieldKg - poultryShare) * 100) / 100;
    return {
      harvestDate: new Date().toISOString().split('T')[0],
      trayId,
      freshPrepupaeKg: yieldKg,
      crudeProteinPercent: 42.4,
      allocatedToPoultryKg: poultryShare,
      allocatedToTilapiaKg: tilapiaShare,
      dryResidueFrassKg: frassKg
    };
  }
};
export default new MaggotHarvestService(undefined);
export { MaggotHarvestService };
