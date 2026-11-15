import { sendSuccess, sendCreated } from "../../utils/response.js";
import { Router } from 'express';
import catalogController from './catalog.controller.js';
const router = Router();
router.get('/units', catalogController.getMeasurementUnits);
router.get('/products', catalogController.getProducts);
router.get('/', catalogController.getProducts);
"use strict";
import * as catalog_service_1 from './catalog.service.js';
const service = catalog_service_1.default;
router.post('/products', async (req, res, next) => {
  try {
    const product = await service.createProduct(req.body);
    sendCreated(res, product);
  } catch (err) {
    next(err);
  }
});
router.post('/units/convert', async (req, res, next) => {
  try {
    const result = await service.convertUnit(req.body);
    sendSuccess(res, result);
  } catch (err) {
    next(err);
  }
});
export default router;
