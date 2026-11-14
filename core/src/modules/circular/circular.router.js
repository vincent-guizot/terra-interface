"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.circularRouter = void 0;
const express_1 = require("express");
const circular_service_1 = require("./circular.service");
const maggot_harvest_service_1 = require("./maggot-harvest.service");
const inventory_service_1 = require("../inventory/inventory.service");
const prisma_service_1 = require("../../prisma/prisma.service");
exports.circularRouter = (0, express_1.Router)();
const inventoryService = new inventory_service_1.InventoryService(prisma_service_1.prisma);
const maggotHarvestService = new maggot_harvest_service_1.MaggotHarvestService();
const service = new circular_service_1.CircularService(prisma_service_1.prisma, maggotHarvestService, inventoryService);
exports.circularRouter.get('/overview', async (req, res, next) => {
    try {
        const overview = await service.getCircularOverview();
        res.json(overview);
    }
    catch (err) {
        next(err);
    }
});
exports.circularRouter.get('/bsf/trays', async (req, res, next) => {
    try {
        const trays = await service.getBsfTrays();
        res.json(trays);
    }
    catch (err) {
        next(err);
    }
});
exports.circularRouter.post('/bsf/feed', async (req, res, next) => {
    try {
        const result = await service.recordBsfFeed(req.body);
        res.json(result);
    }
    catch (err) {
        next(err);
    }
});
exports.circularRouter.post('/bsf/harvest', async (req, res, next) => {
    try {
        const result = await service.recordMaggotHarvest(req.body);
        res.json(result);
    }
    catch (err) {
        next(err);
    }
});
exports.circularRouter.get('/compost/piles', async (req, res, next) => {
    try {
        const piles = await service.getCompostBatches();
        res.json(piles);
    }
    catch (err) {
        next(err);
    }
});
exports.circularRouter.post('/compost/turn', async (req, res, next) => {
    try {
        const result = await service.recordCompostTurn(req.body);
        res.json(result);
    }
    catch (err) {
        next(err);
    }
});
exports.circularRouter.post('/compost/harvest', async (req, res, next) => {
    try {
        const result = await service.recordCompostHarvest(req.body);
        res.json(result);
    }
    catch (err) {
        next(err);
    }
});
