import { Router } from 'express';
import v1Router from './v1/index.js';
import healthController from '../controllers/healthController.js';
const router = Router();

// Health check endpoint
router.get('/health', healthController.getHealth);

// Version 1 API routes
router.use('/v1', v1Router);
export default router;
