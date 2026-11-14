"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.intelligenceRouter = void 0;
const express_1 = require("express");
const intelligence_service_1 = require("./intelligence.service");
const prisma_service_1 = require("../../prisma/prisma.service");
exports.intelligenceRouter = (0, express_1.Router)();
const service = new intelligence_service_1.IntelligenceService(prisma_service_1.prisma);
exports.intelligenceRouter.get('/autonomy', async (req, res, next) => {
    try {
        const autonomy = await service.getAutonomyScores();
        res.json(autonomy);
    }
    catch (err) {
        next(err);
    }
});
exports.intelligenceRouter.get('/insights', async (req, res, next) => {
    try {
        const insights = await service.getInsights();
        res.json(insights);
    }
    catch (err) {
        next(err);
    }
});
exports.intelligenceRouter.post('/insights/:id/apply', async (req, res, next) => {
    try {
        const result = await service.applyRecommendation(req.params.id, req.body?.notes);
        res.json(result);
    }
    catch (err) {
        next(err);
    }
});
exports.intelligenceRouter.post('/insights/:id/dismiss', async (req, res, next) => {
    try {
        const result = await service.dismissRecommendation(req.params.id);
        res.json(result);
    }
    catch (err) {
        next(err);
    }
});
exports.intelligenceRouter.post('/diagnose', async (req, res, next) => {
    try {
        const diagnosis = await service.diagnosePlant(req.body);
        res.json(diagnosis);
    }
    catch (err) {
        next(err);
    }
});
exports.intelligenceRouter.post('/query', async (req, res, next) => {
    try {
        const response = await service.processQuery(req.body);
        res.json(response);
    }
    catch (err) {
        next(err);
    }
});
exports.intelligenceRouter.get('/forecast', async (req, res, next) => {
    try {
        const forecast = await service.getForecast();
        res.json(forecast);
    }
    catch (err) {
        next(err);
    }
});
exports.intelligenceRouter.get('/audit', (req, res) => {
    const audit = service.exportChatAudit();
    res.setHeader('Content-Type', 'application/json');
    res.send(audit);
});
