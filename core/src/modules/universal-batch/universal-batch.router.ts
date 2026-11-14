import { Router, Request, Response, NextFunction } from 'express';
import { UniversalBatchService } from './universal-batch.service';
import { prisma } from '../../prisma/prisma.service';

export const universalBatchRouter = Router();
const service = new UniversalBatchService(prisma);

universalBatchRouter.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { domain, status } = req.query;
    const batches = await service.findAll(domain as string, status as string);
    res.json(batches);
  } catch (err) {
    next(err);
  }
});

universalBatchRouter.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const batch = await service.findOne(req.params.id);
    res.json(batch);
  } catch (err) {
    next(err);
  }
});

universalBatchRouter.post('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const created = await service.create(req.body);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

universalBatchRouter.patch('/:id/transition', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const updated = await service.transitionStatus(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

universalBatchRouter.post('/:id/events', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const event = await service.recordEvent(req.params.id, req.body);
    res.status(201).json(event);
  } catch (err) {
    next(err);
  }
});

universalBatchRouter.post('/:id/outputs', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const output = await service.addOutput(req.params.id, req.body);
    res.status(201).json(output);
  } catch (err) {
    next(err);
  }
});
