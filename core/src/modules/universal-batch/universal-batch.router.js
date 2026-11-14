"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.universalBatchRouter = void 0;
const express_1 = require("express");
const universal_batch_service_1 = require("./universal-batch.service");
const prisma_service_1 = require("../../prisma/prisma.service");
exports.universalBatchRouter = (0, express_1.Router)();
const service = new universal_batch_service_1.UniversalBatchService(prisma_service_1.prisma);
exports.universalBatchRouter.get('/', async (req, res, next) => {
    try {
        const { domain, status } = req.query;
        const batches = await service.findAll(domain, status);
        res.json(batches);
    }
    catch (err) {
        next(err);
    }
});
exports.universalBatchRouter.get('/:id', async (req, res, next) => {
    try {
        const batch = await service.findOne(req.params.id);
        res.json(batch);
    }
    catch (err) {
        next(err);
    }
});
exports.universalBatchRouter.post('/', async (req, res, next) => {
    try {
        const created = await service.create(req.body);
        res.status(201).json(created);
    }
    catch (err) {
        next(err);
    }
});
exports.universalBatchRouter.patch('/:id/transition', async (req, res, next) => {
    try {
        const updated = await service.transitionStatus(req.params.id, req.body);
        res.json(updated);
    }
    catch (err) {
        next(err);
    }
});
exports.universalBatchRouter.post('/:id/events', async (req, res, next) => {
    try {
        const event = await service.recordEvent(req.params.id, req.body);
        res.status(201).json(event);
    }
    catch (err) {
        next(err);
    }
});
exports.universalBatchRouter.post('/:id/outputs', async (req, res, next) => {
    try {
        const output = await service.addOutput(req.params.id, req.body);
        res.status(201).json(output);
    }
    catch (err) {
        next(err);
    }
});
