import { ApiClient, ApiError } from './apiClient';
import { initialCultivationData } from '../data/operationsData';

export class BatchService {
  static async getBatches(domain, status) {
    try {
      return await ApiClient.get('/batches', { domain, status });
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        console.warn('[BatchService] Running in DEMO mode, returning local fixture data.');
        return initialCultivationData.batches;
      }
      throw err;
    }
  }

  static async getBatchById(id) {
    return ApiClient.get(`/batches/${id}`);
  }

  static async createBatch(batchData) {
    try {
      return await ApiClient.post('/batches', batchData);
    } catch (err) {
      if (ApiClient.isDemoMode()) {
        console.warn('[BatchService] Running in DEMO mode, generating local mock batch.');
        return {
          id: `bat-${Date.now()}`,
          ...batchData,
          status: 'ACTIVE',
          harvests: [],
          auditLogs: [{ date: 'Just now', action: 'Universal Batch Created (Demo Mode)', user: 'Vincent' }],
        };
      }
      throw err;
    }
  }

  static async transitionStatus(batchId, newStatus, reason) {
    return ApiClient.patch(`/batches/${batchId}/status`, { status: newStatus, reason });
  }

  static async addHarvestOutput(batchId, outputData) {
    return ApiClient.post(`/batches/${batchId}/outputs`, outputData);
  }
}
