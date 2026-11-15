import { Router } from 'express';
import homesteadsController from './homesteads.controller.js';
const router = Router();
router.get('/profile', homesteadsController.getProfile);
router.get('/status', homesteadsController.getStatus);
router.get('/autonomy', homesteadsController.getAutonomy);
router.get('/', homesteadsController.getProfile);
export default router;
