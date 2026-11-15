import activitiesService from './activities.service.js';
import { sendSuccess, sendCreated } from '../../utils/response.js';
export async function getSummary(req, res, next) {
  try {
    const summary = await activitiesService.getActivitiesSummary();
    return sendSuccess(res, summary, 'Activities summary retrieved');
  } catch (err) {
    next(err);
  }
}
export async function getTasks(req, res, next) {
  try {
    const {
      domain,
      completed
    } = req.query;
    const tasks = await activitiesService.getTasks(domain, completed);
    return sendSuccess(res, tasks, 'Homestead tasks retrieved');
  } catch (err) {
    next(err);
  }
}
export async function getTaskById(req, res, next) {
  try {
    const task = await activitiesService.getTaskById(req.params.id);
    if (!task) {
      return res.status(404).json({
        success: false,
        error: {
          message: `Task '${req.params.id}' not found`,
          statusCode: 404,
          code: 'NOT_FOUND'
        }
      });
    }
    return sendSuccess(res, task, 'Homestead task retrieved');
  } catch (err) {
    next(err);
  }
}
export async function createTask(req, res, next) {
  try {
    const created = await activitiesService.createTask(req.body);
    return sendCreated(res, created, 'Homestead task created successfully');
  } catch (err) {
    next(err);
  }
}
export async function toggleCompleted(req, res, next) {
  try {
    const task = await activitiesService.toggleTaskCompleted(req.params.id);
    return sendSuccess(res, task, 'Task completion status updated');
  } catch (err) {
    next(err);
  }
}
export default {
  getSummary,
  getTasks,
  getTaskById,
  createTask,
  toggleCompleted
};
