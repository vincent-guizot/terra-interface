import { Router } from 'express';
import zonesController from './zones.controller.js';
const router = Router();
router.get('/facilities', zonesController.getFacilities);
router.get('/facilities/:id', zonesController.getFacilityById);
router.get('/buildings', zonesController.getBuildings);
router.get('/', zonesController.getFacilities);
export default router;
