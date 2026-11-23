import * as service from './dashboard.service.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';

const wrap = (fn, message, created = false) => async (req, res, next) => {
  try {
    const data = await fn(req);
    return created ? sendCreated(res, data, message) : sendSuccess(res, data, message);
  } catch (err) {
    return next(err);
  }
};

export default {
  overview: wrap(() => service.getOverview(), 'Overview retrieved'),
  map: wrap(() => service.getMap(), 'Ecosystem map retrieved'),
  production: wrap(() => service.getProduction(), 'Production dashboard retrieved'),
  resources: wrap(() => service.getResources(), 'Resources dashboard retrieved'),
  activities: wrap(() => service.getActivities(), 'Activities dashboard retrieved'),
  createTask: wrap((req) => service.createTask(req.body), 'Task created', true),
  toggleTask: wrap((req) => service.toggleTask(req.params.id), 'Task updated'),
  intelligence: wrap(() => service.getIntelligence(), 'Intelligence dashboard retrieved'),
  applyRecommendation: wrap((req) => service.applyRecommendation(req.params.id), 'Recommendation applied'),
  ask: wrap((req) => service.askAssistant(req.body?.query), 'Assistant reply'),
};
