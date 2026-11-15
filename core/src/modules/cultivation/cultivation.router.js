import { sendSuccess, sendCreated } from "../../utils/response.js";
import { Router } from 'express';
import cultivationController from './cultivation.controller.js';
const router = Router();
router.get('/summary', cultivationController.getSummary);
router.get('/', cultivationController.getSummary);
"use strict";
import * as cultivation_service_1 from './cultivation.service.js';
const service = cultivation_service_1.default;
router.get('/microgreens/calibration', (req, res, next) => {
  try {
    sendSuccess(res, service.getMicrogreenCalibration());
  } catch (error) {
    next(error);
  }
});
router.get('/catalog', async (req, res, next) => {
  try {
    const catalog = await service.getCatalog(req.query.category);
    sendSuccess(res, catalog);
  } catch (err) {
    next(err);
  }
});
router.post('/catalog', async (req, res, next) => {
  try {
    const variety = await service.createCropVariety(req.body);
    sendCreated(res, variety);
  } catch (err) {
    next(err);
  }
});
router.get('/batches/active', async (req, res, next) => {
  try {
    const batches = await service.getActiveBatches();
    sendSuccess(res, batches);
  } catch (err) {
    next(err);
  }
});
router.post('/nutrient-dosing', async (req, res, next) => {
  try {
    const dosing = await service.calculateNutrientDosing(req.body);
    sendSuccess(res, dosing);
  } catch (err) {
    next(err);
  }
});
export default router;
