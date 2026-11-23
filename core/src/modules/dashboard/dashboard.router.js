import { Router } from 'express';
import controller from './dashboard.controller.js';

const router = Router();
router.get('/overview', controller.overview);
router.get('/map', controller.map);
router.get('/production', controller.production);
router.get('/resources', controller.resources);
router.get('/activities', controller.activities);
router.post('/activities/tasks', controller.createTask);
router.patch('/activities/tasks/:id/toggle', controller.toggleTask);
router.get('/intelligence', controller.intelligence);
router.post('/intelligence/recommendations/:id/apply', controller.applyRecommendation);
router.post('/intelligence/ask', controller.ask);

export default router;
