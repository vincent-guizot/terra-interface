import livestockService from './livestock.service.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';
export async function getSummary(req, res, next) {
  try {
    const data = await livestockService.getLivestockSummary();
    return sendSuccess(res, data, 'Livestock summary retrieved successfully');
  } catch (err) {
    next(err);
  }
}
export async function getAnimals(req, res, next) {
  try {
    const {
      breed,
      housingSystem
    } = req.query;
    const animals = await livestockService.getAnimals(breed, housingSystem);
    return sendSuccess(res, animals, 'Livestock animals list retrieved');
  } catch (err) {
    next(err);
  }
}
export async function recordEggHarvest(req, res, next) {
  try {
    const result = await livestockService.recordEggHarvest(req.body);
    return sendCreated(res, result, 'Egg harvest recorded successfully');
  } catch (err) {
    next(err);
  }
}
export async function getEggHarvestHistory(req, res, next) {
  try {
    const history = await livestockService.getEggHarvestLogs();
    return sendSuccess(res, history, 'Egg harvest history retrieved');
  } catch (err) {
    next(err);
  }
}
export async function recordFeeding(req, res, next) {
  try {
    const result = await livestockService.recordFeeding(req.body);
    return sendCreated(res, result, 'Livestock feeding recorded successfully');
  } catch (err) {
    next(err);
  }
}
export async function recordMortality(req, res, next) {
  try {
    const result = await livestockService.recordMortality(req.body);
    return sendCreated(res, result, 'Mortality event logged');
  } catch (err) {
    next(err);
  }
}
export default {
  getSummary,
  getAnimals,
  recordEggHarvest,
  getEggHarvestHistory,
  recordFeeding,
  recordMortality
};
