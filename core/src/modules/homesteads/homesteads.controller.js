import homesteadsService from './homesteads.service.js';
import { sendSuccess } from '../../utils/response.js';
export async function getProfile(req, res, next) {
  try {
    const data = await homesteadsService.getProfile();
    return sendSuccess(res, data, 'Homestead profile retrieved successfully');
  } catch (err) {
    next(err);
  }
}
export async function getStatus(req, res, next) {
  try {
    const data = await homesteadsService.getStatus();
    return sendSuccess(res, data, 'Homestead ecosystem status retrieved successfully');
  } catch (err) {
    next(err);
  }
}
export async function getAutonomy(req, res, next) {
  try {
    const data = await homesteadsService.getAutonomy();
    return sendSuccess(res, data, 'Homestead autonomy metrics retrieved successfully');
  } catch (err) {
    next(err);
  }
}
export default {
  getProfile,
  getStatus,
  getAutonomy
};
