"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catalogRouter = void 0;
const express_1 = require("express");
const catalog_service_1 = require("./catalog.service");
const prisma_service_1 = require("../../prisma/prisma.service");
exports.catalogRouter = (0, express_1.Router)();
const service = new catalog_service_1.CatalogService(prisma_service_1.prisma);
exports.catalogRouter.get('/products', async (req, res, next) => {
    try {
        const products = await service.getProducts(req.query.category);
        res.json(products);
    }
    catch (err) {
        next(err);
    }
});
exports.catalogRouter.post('/products', async (req, res, next) => {
    try {
        const product = await service.createProduct(req.body);
        res.status(201).json(product);
    }
    catch (err) {
        next(err);
    }
});
exports.catalogRouter.post('/units/convert', async (req, res, next) => {
    try {
        const result = await service.convertUnit(req.body);
        res.json(result);
    }
    catch (err) {
        next(err);
    }
});
