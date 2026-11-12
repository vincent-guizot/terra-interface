import { ApiClient } from './apiClient';
import { initialCultivationData } from '../data/operationsData';

export class BatchService {
  static async getBatches(domain, status) {
    const remoteData = await ApiClient.get('/batches', { domain, status });
    if (remoteData) return remoteData;
    // Fallback to local data
    return initialCultivationData.batches;
  }

  static async createBatch(batchData) {
    const remoteResult = await ApiClient.post('/batches', batchData);
    if (remoteResult) return remoteResult;
    return {
      id: `bat-${Date.now()}`,
      ...batchData,
      status: 'ACTIVE',
      harvests: [],
      auditLogs: [{ date: 'Just now', action: 'Universal Batch Created', user: 'Vincent' }],
    };
  }

  static async transitionStatus(batchId, newStatus, reason) {
    return ApiClient.patch(`/batches/${batchId}/status`, { status: newStatus, reason });
  }

  static async addHarvestOutput(batchId, outputData) {
    return ApiClient.post(`/batches/${batchId}/outputs`, outputData);
  }
}
