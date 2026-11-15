import catalogService from './catalog.service.js';
import { sendSuccess } from '../../utils/response.js';
export async function getMeasurementUnits(req, res, next) {
  try {
    const data = await catalogService.getMeasurementUnits();
    return sendSuccess(res, data, 'Measurement units retrieved successfully');
  } catch (err) {
    next(err);
  }
}
export async function getProducts(req, res, next) {
  try {
    const data = await catalogService.getProducts();
    return sendSuccess(res, data, 'Products retrieved successfully');
  } catch (err) {
    next(err);
  }
}
export default {
  getMeasurementUnits,
  getProducts
};
