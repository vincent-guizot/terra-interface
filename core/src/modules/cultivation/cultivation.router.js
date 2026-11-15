import { Router } from 'express';
import cultivationController from './cultivation.controller.js';
const router = Router();
router.get('/summary', cultivationController.getSummary);
router.get('/', cultivationController.getSummary);
"use strict";
import * as cultivation_service_1 from './cultivation.service.js';
const service = cultivation_service_1.default;
router.get('/microgreens/calibration', (req, res, next) => {
  try { res.json(service.getMicrogreenCalibration()); } catch (error) { next(error); }
});
router.get('/catalog', async (req, res, next) => {
  try {
    const catalog = await service.getCatalog(req.query.category);
    res.json(catalog);
  } catch (err) {
    next(err);
  }
});
router.post('/catalog', async (req, res, next) => {
  try {
    const variety = await service.createCropVariety(req.body);
    res.status(201).json(variety);
  } catch (err) {
    next(err);
  }
});
router.get('/batches/active', async (req, res, next) => {
  try {
    const batches = await service.getActiveBatches();
    res.json(batches);
  } catch (err) {
    next(err);
  }
});
router.post('/nutrient-dosing', async (req, res, next) => {
  try {
    const dosing = await service.calculateNutrientDosing(req.body);
    res.json(dosing);
  } catch (err) {
    next(err);
  }
});
export default router;
