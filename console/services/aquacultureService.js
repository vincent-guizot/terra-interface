import { ApiClient } from './apiClient';

export class AquacultureService {
  static async getPonds() {
    try {
      return await ApiClient.get('/aquaculture/ponds');
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        return [
          {
            id: 'pnd-01',
            pondCode: 'PND-01',
            name: 'Tilapia IBC Bio-Floc Tank Alpha',
            species: 'Oreochromis niloticus (Nile Tilapia)',
            volumeLiters: 4000,
            currentStockCount: 442,
            averageWeightGrams: 440,
            totalBiomassKg: 194.5,
            stockingDensityKgM3: 48.6,
            waterQuality: {
              dissolvedOxygenMgL: 6.2,
              pH: 7.2,
              waterTempC: 26.5,
              ammoniaPpm: 0.15,
              status: 'OPTIMAL',
            },
          },
          {
            id: 'pnd-02',
            pondCode: 'PND-02',
            name: 'Catfish High-Density Tarpaulin Tank',
            species: 'Clarias gariepinus (African Catfish)',
            volumeLiters: 2500,
            currentStockCount: 300,
            averageWeightGrams: 280,
            totalBiomassKg: 84.0,
            stockingDensityKgM3: 33.6,
            waterQuality: {
              dissolvedOxygenMgL: 5.4,
              pH: 6.9,
              waterTempC: 27.8,
              ammoniaPpm: 0.35,
              status: 'OPTIMAL',
            },
          },
        ];
      }
      throw err;
    }
  }

  static async getWaterQuality(pondId) {
    try {
      return await ApiClient.get('/aquaculture/water-quality', { pondId });
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        return [
          {
            id: 'wtest-01',
            pondId: pondId || 'PND-01',
            testedAt: new Date().toISOString(),
            dissolvedOxygenMgL: 6.2,
            pH: 7.2,
            waterTempC: 26.5,
            ammoniaPpm: 0.15,
            status: 'OPTIMAL',
            notes: 'Bio-floc aggregation stable',
          },
        ];
      }
      throw err;
    }
  }

  static async recordWaterTest(data) {
    try {
      return await ApiClient.post('/aquaculture/water-test', data);
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        const alerts = [];
        if (data.dissolvedOxygenMgL < 5.0) {
          alerts.push('CRITICAL: Dissolved oxygen below 5.0 mg/L.');
        }
        if (data.pH < 6.5 || data.pH > 8.0) {
          alerts.push(`WARNING: pH out of optimal bounds (${data.pH}).`);
        }
        if (data.ammoniaPpm > 0.5) {
          alerts.push(`ELEVATED: Ammonia at ${data.ammoniaPpm} ppm.`);
        }

        return {
          id: `wtest-${Date.now()}`,
          ...data,
          testedAt: new Date().toISOString(),
          evaluation: {
            status: alerts.length === 0 ? 'OPTIMAL' : 'ATTENTION_REQUIRED',
            alerts,
          },
        };
      }
      throw err;
    }
  }

  static async recordFeeding(data) {
    try {
      return await ApiClient.post('/aquaculture/feeding', data);
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        return {
          id: `ffeed-${Date.now()}`,
          ...data,
          fedAt: new Date().toISOString(),
        };
      }
      throw err;
    }
  }

  static async getAerationSchedule() {
    return ApiClient.get('/aquaculture/aeration/cycles');
  }
}
