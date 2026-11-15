import aquacultureService from './aquaculture.service.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';
export async function getSummary(req, res, next) {
  try {
    const summary = await aquacultureService.getSummary();
    return sendSuccess(res, summary, 'Aquaculture summary retrieved');
  } catch (err) {
    next(err);
  }
}
export async function getPonds(req, res, next) {
  try {
    const ponds = await aquacultureService.getPonds();
    return sendSuccess(res, ponds, 'Aquaculture ponds retrieved');
  } catch (err) {
    next(err);
  }
}
export async function getWaterQuality(req, res, next) {
  try {
    const {
      pondId
    } = req.query;
    const records = aquacultureService.getWaterQuality(pondId);
    return sendSuccess(res, records, 'Water quality records retrieved');
  } catch (err) {
    next(err);
  }
}
export async function recordWaterTest(req, res, next) {
  try {
    const result = await aquacultureService.recordWaterTest(req.body);
    return sendCreated(res, result, 'Water test recorded successfully');
  } catch (err) {
    next(err);
  }
}
export async function recordFeeding(req, res, next) {
  try {
    const result = await aquacultureService.recordFeeding(req.body);
    return sendCreated(res, result, 'Fish feeding recorded successfully');
  } catch (err) {
    next(err);
  }
}
export async function getFeedingLogs(req, res, next) {
  try {
    const logs = aquacultureService.getFishFeedLogs();
    return sendSuccess(res, logs, 'Fish feeding logs retrieved');
  } catch (err) {
    next(err);
  }
}
export async function getAerationSchedule(req, res, next) {
  try {
    const schedule = aquacultureService.getAerationSchedule();
    return sendSuccess(res, schedule, 'Aeration schedule retrieved');
  } catch (err) {
    next(err);
  }
}
export default {
  getSummary,
  getPonds,
  getWaterQuality,
  recordWaterTest,
  recordFeeding,
  getFeedingLogs,
  getAerationSchedule
};
