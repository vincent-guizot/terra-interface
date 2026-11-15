import { Router } from 'express';
import batchesController from './batches.controller.js';
const router = Router();
router.get('/', batchesController.getAllBatches);
router.get('/:id', batchesController.getBatchById);
export default router;
