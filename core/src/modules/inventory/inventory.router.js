"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.inventoryRouter = void 0;
const express_1 = require("express");
const inventory_service_1 = require("./inventory.service");
exports.inventoryRouter = (0, express_1.Router)();
const service = inventory_service_1.inventoryService;
exports.inventoryRouter.get('/items', async (req, res, next) => {
    try {
        const items = await service.getItems(req.query.category, req.query.lowStock === 'true');
        res.json(items);
    }
    catch (err) {
        next(err);
    }
});
exports.inventoryRouter.post('/items', async (req, res, next) => {
    try {
        const item = await service.createItem(req.body);
        res.status(201).json(item);
    }
    catch (err) {
        next(err);
    }
});
exports.inventoryRouter.get('/locations', async (req, res, next) => {
    try {
        const locations = await service.getStorageLocations();
        res.json(locations);
    }
    catch (err) {
        next(err);
    }
});
exports.inventoryRouter.get('/movements', async (req, res, next) => {
    try {
        const movements = await service.getMovements(req.query.inventoryItemId);
        res.json(movements);
    }
    catch (err) {
        next(err);
    }
});
exports.inventoryRouter.post('/movements', async (req, res, next) => {
    try {
        const movement = await service.recordMovement(req.body);
        res.status(201).json(movement);
    }
    catch (err) {
        next(err);
    }
});
