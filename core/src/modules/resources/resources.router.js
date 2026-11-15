import { Router } from 'express';
import resourcesController from './resources.controller.js';
const router = Router();
router.get('/overview', resourcesController.getOverview);
router.get('/flows', resourcesController.getResourceFlows);
router.get('/flows/:id', resourcesController.getFlowById);
router.get('/', resourcesController.getOverview);
export default router;
