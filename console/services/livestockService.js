import { ApiClient } from './apiClient';

export class LivestockService {
  static async getAnimals(breed, housingSystem) {
    try {
      return await ApiClient.get('/livestock/animals', { breed, housingSystem });
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        return [
          {
            id: 'liv-kub-01',
            batchCode: 'BAT-2026-LIV-01',
            name: 'Ayam KUB Layer Flock Season 2',
            breed: 'Ayam KUB (Kampung Unggul Balitbangtan)',
            zoneCode: 'Z-03',
            zoneName: 'Poultry & Small Ruminants Hub',
            headCount: 24,
            housingSystem: 'Deep Litter Bedding + Covered Run',
            status: 'ACTIVE',
            productionRate: '87.5% Hen-Day Production (21 eggs/day)',
          },
          {
            id: 'liv-joper-02',
            batchCode: 'BAT-2026-LIV-02',
            name: 'Joper Cross Meat Cohort #4',
            breed: 'Ayam Joper (Jawa Super)',
            zoneCode: 'Z-03',
            zoneName: 'Poultry & Small Ruminants Hub',
            headCount: 45,
            housingSystem: 'Slatted Bamboo Rearing Bay',
            status: 'ACTIVE',
            productionRate: 'Average Weight 890g (FCR 1.48)',
          },
          {
            id: 'liv-garut-03',
            batchCode: 'BAT-2026-LIV-03',
            name: 'Garut Sheep Grazing Mob',
            breed: 'Domba Garut',
            zoneCode: 'Z-03',
            zoneName: 'Poultry & Small Ruminants Hub',
            headCount: 4,
            housingSystem: 'Rotational Grazing Paddock (Swale Run)',
            status: 'ACTIVE',
            productionRate: 'Paddock Rest Cycle 25 Days',
          },
        ];
      }
      throw err;
    }
  }

  static async recordEggHarvest(data) {
    try {
      return await ApiClient.post('/livestock/egg-harvest', data);
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        const totalHens = data.totalHens || 24;
        const hdp = Math.round((data.eggsCollected / totalHens) * 1000) / 10;
        return {
          id: `egg-${Date.now()}`,
          batchCode: data.batchCode,
          date: new Date().toISOString(),
          eggsCollected: data.eggsCollected,
          gradeACount: data.gradeACount ?? data.eggsCollected,
          crackedCount: data.crackedCount ?? 0,
          totalHens,
          henDayProductionPercent: hdp,
          notes: data.notes || '',
        };
      }
      throw err;
    }
  }

  static async recordFeeding(data) {
    try {
      return await ApiClient.post('/livestock/feeding', data);
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        return {
          id: `feed-${Date.now()}`,
          ...data,
          fedAt: new Date().toISOString(),
        };
      }
      throw err;
    }
  }

  static async recordMortality(data) {
    return ApiClient.post('/livestock/mortality', data);
  }

  static async getGrowthBenchmarks() {
    return ApiClient.get('/livestock/benchmarks/growth');
  }

  static async getPaddockPlan() {
    return ApiClient.get('/livestock/grazing/paddocks');
  }
}
