import { sendSuccess, sendCreated } from "../../utils/response.js";
const universalBatchRouter = (0, express_1.Router)();
"use strict";
import * as express_1 from "express";
import * as universal_batch_service_1 from "./universal-batch.service.js";
import * as prisma_service_1 from "../../prisma/prisma.service.js";
const service = new universal_batch_service_1.UniversalBatchService(prisma_service_1.prisma);
universalBatchRouter.get('/', async (req, res, next) => {
  try {
    const {
      domain,
      status
    } = req.query;
    const batches = await service.findAll(domain, status);
    sendSuccess(res, batches);
  } catch (err) {
    next(err);
  }
});
universalBatchRouter.get('/:id', async (req, res, next) => {
  try {
    const batch = await service.findOne(req.params.id);
    sendSuccess(res, batch);
  } catch (err) {
    next(err);
  }
});
universalBatchRouter.post('/', async (req, res, next) => {
  try {
    const created = await service.create(req.body);
    sendCreated(res, created);
  } catch (err) {
    next(err);
  }
});
universalBatchRouter.patch('/:id/transition', async (req, res, next) => {
  try {
    const updated = await service.transitionStatus(req.params.id, req.body);
    sendSuccess(res, updated);
  } catch (err) {
    next(err);
  }
});
universalBatchRouter.post('/:id/events', async (req, res, next) => {
  try {
    const event = await service.recordEvent(req.params.id, req.body);
    sendCreated(res, event);
  } catch (err) {
    next(err);
  }
});
universalBatchRouter.post('/:id/outputs', async (req, res, next) => {
  try {
    const output = await service.addOutput(req.params.id, req.body);
    sendCreated(res, output);
  } catch (err) {
    next(err);
  }
});
export { universalBatchRouter };
