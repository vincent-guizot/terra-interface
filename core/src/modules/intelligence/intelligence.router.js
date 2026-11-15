import { sendSuccess } from "../../utils/response.js";
import { Router } from 'express';
import intelligenceController from './intelligence.controller.js';
const router = Router();
router.get('/autonomy', intelligenceController.getAutonomyScores);
router.get('/recommendations', intelligenceController.getInsights);
router.post('/recommendations/:id/apply', intelligenceController.applyRecommendation);
router.post('/recommendations/:id/dismiss', intelligenceController.dismissRecommendation);
router.get('/diagnose', intelligenceController.diagnosePlant);
router.get('/rules', intelligenceController.getRules);
router.get('/', intelligenceController.getAutonomyScores);
"use strict";
import * as intelligence_service_1 from './intelligence.service.js';
const service = intelligence_service_1.default;
router.get('/insights', async (req, res, next) => {
  try {
    const insights = await service.getInsights();
    sendSuccess(res, insights);
  } catch (err) {
    next(err);
  }
});
router.post('/insights/:id/apply', async (req, res, next) => {
  try {
    const result = await service.applyRecommendation(req.params.id, req.body?.notes);
    sendSuccess(res, result);
  } catch (err) {
    next(err);
  }
});
router.post('/insights/:id/dismiss', async (req, res, next) => {
  try {
    const result = await service.dismissRecommendation(req.params.id);
    sendSuccess(res, result);
  } catch (err) {
    next(err);
  }
});
router.post('/diagnose', async (req, res, next) => {
  try {
    const diagnosis = await service.diagnosePlant(req.body);
    sendSuccess(res, diagnosis);
  } catch (err) {
    next(err);
  }
});
router.post('/query', async (req, res, next) => {
  try {
    const response = await service.processQuery(req.body);
    sendSuccess(res, response);
  } catch (err) {
    next(err);
  }
});
router.get('/forecast', async (req, res, next) => {
  try {
    const forecast = await service.getForecast();
    sendSuccess(res, forecast);
  } catch (err) {
    next(err);
  }
});
router.get('/audit', (req, res) => {
  const audit = service.exportChatAudit();
  res.setHeader('Content-Type', 'application/json');
  res.send(audit);
});
export default router;
