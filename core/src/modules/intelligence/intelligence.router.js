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
    res.json(insights);
  } catch (err) {
    next(err);
  }
});
router.post('/insights/:id/apply', async (req, res, next) => {
  try {
    const result = await service.applyRecommendation(req.params.id, req.body?.notes);
    res.json(result);
  } catch (err) {
    next(err);
  }
});
router.post('/insights/:id/dismiss', async (req, res, next) => {
  try {
    const result = await service.dismissRecommendation(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});
router.post('/diagnose', async (req, res, next) => {
  try {
    const diagnosis = await service.diagnosePlant(req.body);
    res.json(diagnosis);
  } catch (err) {
    next(err);
  }
});
router.post('/query', async (req, res, next) => {
  try {
    const response = await service.processQuery(req.body);
    res.json(response);
  } catch (err) {
    next(err);
  }
});
router.get('/forecast', async (req, res, next) => {
  try {
    const forecast = await service.getForecast();
    res.json(forecast);
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
