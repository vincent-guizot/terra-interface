import cultivationService from './cultivation.service.js';
import { sendSuccess } from '../../utils/response.js';
export async function getSummary(req, res, next) {
  try {
    const data = await cultivationService.getCultivationSummary();
    return sendSuccess(res, data, 'Cultivation summary retrieved successfully');
  } catch (err) {
    next(err);
  }
}
export default {
  getSummary
};
