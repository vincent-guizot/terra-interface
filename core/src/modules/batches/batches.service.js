import batchesRepository from './batches.repository.js';
import { AppError } from '../../middlewares/errorHandler.js';
export class BatchesService {
  async getAllBatches(domain) {
    const batches = await batchesRepository.getAllBatches();
    if (!domain) return batches;
    return batches.filter(b => b.domain.toLowerCase() === domain.toLowerCase());
  }
  async getBatchById(id) {
    const batch = await batchesRepository.getBatchById(id);
    if (!batch) {
      throw new AppError(`Batch with ID '${id}' not found`, 404, 'BATCH_NOT_FOUND');
    }
    return batch;
  }
}
export default new BatchesService();
