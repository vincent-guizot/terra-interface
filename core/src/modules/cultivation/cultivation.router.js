"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cultivationRouter = void 0;
const express_1 = require("express");
const cultivation_service_1 = require("./cultivation.service");
const prisma_service_1 = require("../../prisma/prisma.service");
exports.cultivationRouter = (0, express_1.Router)();
const service = new cultivation_service_1.CultivationService(prisma_service_1.prisma);
exports.cultivationRouter.get('/catalog', async (req, res, next) => {
    try {
        const catalog = await service.getCatalog(req.query.category);
        res.json(catalog);
    }
    catch (err) {
        next(err);
    }
});
exports.cultivationRouter.post('/catalog', async (req, res, next) => {
    try {
        const variety = await service.createCropVariety(req.body);
        res.status(201).json(variety);
    }
    catch (err) {
        next(err);
    }
});
exports.cultivationRouter.get('/batches/active', async (req, res, next) => {
    try {
        const batches = await service.getActiveBatches();
        res.json(batches);
    }
    catch (err) {
        next(err);
    }
});
exports.cultivationRouter.post('/nutrient-dosing', async (req, res, next) => {
    try {
        const dosing = await service.calculateNutrientDosing(req.body);
        res.json(dosing);
    }
    catch (err) {
        next(err);
    }
});
