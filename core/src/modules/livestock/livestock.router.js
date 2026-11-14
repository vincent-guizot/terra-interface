"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.livestockRouter = void 0;
const express_1 = require("express");
const livestock_service_1 = require("./livestock.service");
const prisma_service_1 = require("../../prisma/prisma.service");
exports.livestockRouter = (0, express_1.Router)();
const service = new livestock_service_1.LivestockService(prisma_service_1.prisma);
exports.livestockRouter.get('/animals', async (req, res, next) => {
    try {
        const animals = await service.getAnimals(req.query.breed, req.query.housingSystem);
        res.json(animals);
    }
    catch (err) {
        next(err);
    }
});
exports.livestockRouter.post('/egg-harvest', async (req, res, next) => {
    try {
        const result = await service.recordEggHarvest(req.body);
        res.status(201).json(result);
    }
    catch (err) {
        next(err);
    }
});
exports.livestockRouter.get('/egg-harvest/history', async (req, res, next) => {
    try {
        const history = await service.getEggHarvestLogs();
        res.json(history);
    }
    catch (err) {
        next(err);
    }
});
exports.livestockRouter.post('/feeding', async (req, res, next) => {
    try {
        const result = await service.recordFeeding(req.body);
        res.status(201).json(result);
    }
    catch (err) {
        next(err);
    }
});
exports.livestockRouter.post('/mortality', async (req, res, next) => {
    try {
        const result = await service.recordMortality(req.body);
        res.status(201).json(result);
    }
    catch (err) {
        next(err);
    }
});
