import { Router } from 'express';
import productionController from './production.controller.js';
const router = Router();
router.get('/summary', productionController.getSummary);
router.get('/categories', productionController.getCategories);
router.get('/categories/:id', productionController.getCategoryById);
router.get('/', productionController.getSummary);
export default router;
