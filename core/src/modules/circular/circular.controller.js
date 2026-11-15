import circularService from './circular.service.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';
export async function getOverview(req, res, next) {
  try {
    const data = await circularService.getCircularOverview();
    return sendSuccess(res, data, 'Circular economy overview retrieved');
  } catch (err) {
    next(err);
  }
}
export async function getBsfTrays(req, res, next) {
  try {
    const trays = await circularService.getBsfTrays();
    return sendSuccess(res, trays, 'BSF trays retrieved');
  } catch (err) {
    next(err);
  }
}
export async function recordBsfFeed(req, res, next) {
  try {
    const result = await circularService.recordBsfFeed(req.body);
    return sendCreated(res, result, 'BSF feed intake recorded');
  } catch (err) {
    next(err);
  }
}
export async function recordMaggotHarvest(req, res, next) {
  try {
    const result = await circularService.recordMaggotHarvest(req.body);
    return sendCreated(res, result, 'Maggot harvest recorded');
  } catch (err) {
    next(err);
  }
}
export async function getCompostBatches(req, res, next) {
  try {
    const batches = await circularService.getCompostBatches();
    return sendSuccess(res, batches, 'Compost batches retrieved');
  } catch (err) {
    next(err);
  }
}
export async function getThermophilicProfile(req, res, next) {
  try {
    const profile = await circularService.getThermophilicProfile();
    return sendSuccess(res, profile, 'Bokashi thermophilic temperature profile retrieved');
  } catch (err) {
    next(err);
  }
}
export default {
  getOverview,
  getBsfTrays,
  recordBsfFeed,
  recordMaggotHarvest,
  getCompostBatches,
  getThermophilicProfile
};
