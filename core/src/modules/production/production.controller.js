import productionService from './production.service.js';
import { sendSuccess } from '../../utils/response.js';
export async function getSummary(req, res, next) {
  try {
    const summary = await productionService.getSummary();
    return sendSuccess(res, summary, 'Production summary retrieved successfully');
  } catch (err) {
    next(err);
  }
}
export async function getCategories(req, res, next) {
  try {
    const categories = await productionService.getCategories();
    return sendSuccess(res, categories, 'Production categories retrieved');
  } catch (err) {
    next(err);
  }
}
export async function getCategoryById(req, res, next) {
  try {
    const category = await productionService.getCategoryById(req.params.id);
    if (!category) {
      return res.status(404).json({
        success: false,
        error: {
          message: `Production category '${req.params.id}' not found`,
          statusCode: 404,
          code: 'NOT_FOUND'
        }
      });
    }
    return sendSuccess(res, category, 'Production category retrieved');
  } catch (err) {
    next(err);
  }
}
export default {
  getSummary,
  getCategories,
  getCategoryById
};
