import { ApiClient } from './apiClient';

export class CultivationService {
  static async getCatalog(category) {
    try {
      return await ApiClient.get('/cultivation/catalog', { category });
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        return [
          {
            id: 'crop-bok-choy',
            name: 'Bok Choy White Stem',
            category: 'Leafy Greens',
            targetEcMin: 1.5,
            targetEcMax: 2.0,
            targetPhMin: 6.0,
            targetPhMax: 6.5,
            daysToMaturity: 30,
            growingMethod: 'NFT_SOLUTION',
          },
          {
            id: 'crop-butterhead',
            name: 'Butterhead Lettuce (Rex)',
            category: 'Leafy Greens',
            targetEcMin: 1.2,
            targetEcMax: 1.6,
            targetPhMin: 5.8,
            targetPhMax: 6.4,
            daysToMaturity: 35,
            growingMethod: 'NFT_SOLUTION',
          },
          {
            id: 'crop-genovese-basil',
            name: 'Genovese Sweet Basil',
            category: 'Herbs',
            targetEcMin: 1.0,
            targetEcMax: 1.4,
            targetPhMin: 5.5,
            targetPhMax: 6.5,
            daysToMaturity: 28,
            growingMethod: 'NFT_SOLUTION',
          },
        ];
      }
      throw err;
    }
  }

  static async createCropVariety(data) {
    return ApiClient.post('/cultivation/catalog', data);
  }

  static async getActiveBatches() {
    try {
      return await ApiClient.get('/cultivation/batches/active');
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        return [
          {
            id: 'bat-cult-01',
            batchCode: 'BAT-2026-CUL-01',
            name: 'Spring Greenhouse Bok Choy NFT',
            domain: 'CULTIVATION',
            zone: { code: 'Z-01', name: 'Smart Micro-Greenhouse' },
            status: 'ACTIVE',
            initialQuantity: 120,
            currentQuantity: 95,
            measurementUnit: 'heads',
          },
        ];
      }
      throw err;
    }
  }

  static async calculateNutrientDosing(data) {
    return ApiClient.post('/cultivation/nutrient-dosing', data);
  }

  static async getMicrogreensCalibration() {
    return ApiClient.get('/cultivation/microgreens/calibration');
  }

  static async recordPestScouting(data) {
    return ApiClient.post('/cultivation/pest-scouting', data);
  }

  static async getOrganicPestRecipes() {
    return ApiClient.get('/cultivation/pest-scouting/recipes');
  }
}
