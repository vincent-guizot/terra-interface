import resourcesService from './resources.service.js';
import { sendSuccess, sendError } from '../../utils/response.js';
export async function getOverview(req, res, next) {
  try {
    const overview = await resourcesService.getResourcesOverview();
    return sendSuccess(res, overview, 'Homestead resources overview retrieved');
  } catch (err) {
    next(err);
  }
}
export async function getResourceFlows(req, res, next) {
  try {
    const {
      category,
      flowType
    } = req.query;
    const flows = await resourcesService.getResourceFlows(category, flowType);
    return sendSuccess(res, flows, 'Resource flows retrieved');
  } catch (err) {
    next(err);
  }
}
export async function getFlowById(req, res, next) {
  try {
    const flow = await resourcesService.getFlowById(req.params.id);
    if (!flow) {
      return sendError(res, 404, `Resource flow '${req.params.id}' not found`);
    }
    return sendSuccess(res, flow, 'Resource flow retrieved');
  } catch (err) {
    next(err);
  }
}
export default {
  getOverview,
  getResourceFlows,
  getFlowById
};
