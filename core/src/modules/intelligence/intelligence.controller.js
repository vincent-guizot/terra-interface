import intelligenceService from './intelligence.service.js';
import { sendSuccess } from '../../utils/response.js';
export async function getAutonomyScores(req, res, next) {
  try {
    const scores = await intelligenceService.getAutonomyScores();
    return sendSuccess(res, scores, 'Homestead autonomy scores calculated');
  } catch (err) {
    next(err);
  }
}
export async function getInsights(req, res, next) {
  try {
    const insights = await intelligenceService.getInsights();
    return sendSuccess(res, insights, 'AI recommendations and insights retrieved');
  } catch (err) {
    next(err);
  }
}
export async function applyRecommendation(req, res, next) {
  try {
    const {
      id
    } = req.params;
    const {
      notes
    } = req.body;
    const rec = await intelligenceService.applyRecommendation(id, notes);
    return sendSuccess(res, rec, 'Recommendation applied');
  } catch (err) {
    next(err);
  }
}
export async function dismissRecommendation(req, res, next) {
  try {
    const {
      id
    } = req.params;
    const rec = await intelligenceService.dismissRecommendation(id);
    return sendSuccess(res, rec, 'Recommendation dismissed');
  } catch (err) {
    next(err);
  }
}
export async function diagnosePlant(req, res, next) {
  try {
    const {
      leafZone,
      chlorosisType
    } = req.query;
    const diagnosis = await intelligenceService.diagnosePlant(leafZone || 'lower', chlorosisType || 'uniform');
    return sendSuccess(res, diagnosis, 'Plant diagnosis generated');
  } catch (err) {
    next(err);
  }
}
export async function getRules(req, res, next) {
  try {
    const rules = await intelligenceService.getRules();
    return sendSuccess(res, rules, 'Ecological rules retrieved');
  } catch (err) {
    next(err);
  }
}
export default {
  getAutonomyScores,
  getInsights,
  applyRecommendation,
  dismissRecommendation,
  diagnosePlant,
  getRules
};
