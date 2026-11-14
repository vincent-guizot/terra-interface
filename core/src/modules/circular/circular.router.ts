import { Router, Request, Response, NextFunction } from 'express';
import { CircularService } from './circular.service';
import { MaggotHarvestService } from './maggot-harvest.service';
import { InventoryService } from '../inventory/inventory.service';
import { prisma } from '../../prisma/prisma.service';

export const circularRouter = Router();
const inventoryService = new InventoryService(prisma);
const maggotHarvestService = new MaggotHarvestService();
const service = new CircularService(prisma, maggotHarvestService, inventoryService);

circularRouter.get('/overview', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const overview = await service.getCircularOverview();
    res.json(overview);
  } catch (err) {
    next(err);
  }
});

circularRouter.get('/bsf/trays', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const trays = await service.getBsfTrays();
    res.json(trays);
  } catch (err) {
    next(err);
  }
});

circularRouter.post('/bsf/feed', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.recordBsfFeed(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

circularRouter.post('/bsf/harvest', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.recordMaggotHarvest(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

circularRouter.get('/compost/piles', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const piles = await service.getCompostBatches();
    res.json(piles);
  } catch (err) {
    next(err);
  }
});

circularRouter.post('/compost/turn', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.recordCompostTurn(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

circularRouter.post('/compost/harvest', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.recordCompostHarvest(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
});
