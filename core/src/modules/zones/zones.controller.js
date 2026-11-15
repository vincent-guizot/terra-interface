import zonesService from './zones.service.js';
import { sendSuccess } from '../../utils/response.js';
export async function getFacilities(req, res, next) {
  try {
    const data = await zonesService.getAllFacilities();
    return sendSuccess(res, data, 'Facilities retrieved successfully');
  } catch (err) {
    next(err);
  }
}
export async function getFacilityById(req, res, next) {
  try {
    const data = await zonesService.getFacilityById(req.params.id);
    return sendSuccess(res, data, 'Facility details retrieved successfully');
  } catch (err) {
    next(err);
  }
}
export async function getBuildings(req, res, next) {
  try {
    const data = await zonesService.getAllBuildings();
    return sendSuccess(res, data, 'Buildings retrieved successfully');
  } catch (err) {
    next(err);
  }
}
export default {
  getFacilities,
  getFacilityById,
  getBuildings
};
