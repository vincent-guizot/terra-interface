import batchesService from './batches.service.js';
import { sendSuccess } from '../../utils/response.js';
export async function getAllBatches(req, res, next) {
  try {
    const data = await batchesService.getAllBatches(req.query.domain);
    return sendSuccess(res, data, 'Batches retrieved successfully');
  } catch (err) {
    next(err);
  }
}
export async function getBatchById(req, res, next) {
  try {
    const data = await batchesService.getBatchById(req.params.id);
    return sendSuccess(res, data, 'Batch details retrieved successfully');
  } catch (err) {
    next(err);
  }
}
export default {
  getAllBatches,
  getBatchById
};
