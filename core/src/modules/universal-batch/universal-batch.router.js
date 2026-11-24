import { BatchStatus } from '@prisma/client';
import { AppError } from '../../middlewares/errorHandler.js';
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
universalBatchRouter.get('/form-options', async (req, res, next) => {
  try {
    const db = prisma_service_1.prisma;
    const [zones, items] = await Promise.all([
      db.zone.findMany({ select: { id: true, name: true, homesteadId: true }, orderBy: { name: 'asc' } }),
      db.inventoryItem.findMany({ select: { id: true, name: true, sku: true, unit: true, homesteadId: true }, orderBy: { name: 'asc' } })
    ]);
    sendSuccess(res, { zones, items });
  } catch (error) { next(error); }
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
    const { newStatus, reason } = req.body ?? {};
    if (!Object.values(BatchStatus).includes(newStatus)) {
      throw new AppError('Invalid batch status', 400, 'VALIDATION_ERROR', [
        { field: 'newStatus', message: 'Provide a valid batch status' }
      ]);
    }
    const requiresReason = newStatus === BatchStatus.ON_HOLD || newStatus === BatchStatus.CANCELLED;
    if ((reason !== undefined || requiresReason) && (typeof reason !== 'string' || !reason.trim())) {
      throw new AppError('Invalid transition reason', 400, 'VALIDATION_ERROR', [
        { field: 'reason', message: 'Provide a non-blank explanation' }
      ]);
    }
    const updated = await service.transitionStatus(req.params.id, newStatus, reason?.trim());
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
