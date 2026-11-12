import { ApiClient } from './apiClient';

export class SpatialService {
  static async getCanonicalHomestead() {
    try {
      return await ApiClient.get('/homestead/canonical');
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        return {
          name: "Vincent's Farm",
          totalAreaSqm: 300.0,
          dimensions: '15m x 20m Master Plan',
          location: 'West Java, Indonesia',
          stewardName: 'Vincent',
        };
      }
      throw err;
    }
  }

  static async getZones() {
    try {
      return await ApiClient.get('/homestead/zones');
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        return [
          { code: 'Z-01', name: 'Smart Micro-Greenhouse', areaSqm: 35.0, type: 'CULTIVATION', colorHex: '#10B981' },
          { code: 'Z-02', name: 'Aquaponics & Bio-Pond', areaSqm: 25.0, type: 'AQUACULTURE', colorHex: '#0284C7' },
          { code: 'Z-03', name: 'Intensive Poultry & BSF Hub', areaSqm: 20.0, type: 'LIVESTOCK', colorHex: '#F59E0B' },
          { code: 'Z-04', name: 'Permaculture Food Forest & Beds', areaSqm: 110.0, type: 'CULTIVATION', colorHex: '#65A30D' },
          { code: 'Z-05', name: 'Solar Array & Battery Hub', areaSqm: 30.0, type: 'ENERGY_WATER', colorHex: '#D97706' },
          { code: 'Z-06', name: 'Water Catchment & Filtration', areaSqm: 25.0, type: 'ENERGY_WATER', colorHex: '#0D9488' },
          { code: 'Z-07', name: 'Eco-Living Quarters & Nursery', areaSqm: 55.0, type: 'LIVING', colorHex: '#8B5CF6' },
        ];
      }
      throw err;
    }
  }

  static async getZoneByCode(code) {
    return ApiClient.get(`/homestead/zones/${code}`);
  }
}
