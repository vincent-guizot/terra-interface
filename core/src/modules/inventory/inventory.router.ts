import { Router, Request, Response, NextFunction } from 'express';
import { InventoryService } from './inventory.service';
import { prisma } from '../../prisma/prisma.service';

export const inventoryRouter = Router();
const service = new InventoryService(prisma);

inventoryRouter.get('/items', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const items = await service.getItems(req.query.category as string, req.query.lowStock === 'true');
    res.json(items);
  } catch (err) {
    next(err);
  }
});

inventoryRouter.post('/items', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await service.createItem(req.body);
    res.status(201).json(item);
  } catch (err) {
    next(err);
  }
});

inventoryRouter.get('/locations', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const locations = await service.getStorageLocations();
    res.json(locations);
  } catch (err) {
    next(err);
  }
});

inventoryRouter.get('/movements', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movements = await service.getMovements(req.query.inventoryItemId as string);
    res.json(movements);
  } catch (err) {
    next(err);
  }
});

inventoryRouter.post('/movements', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const movement = await service.recordMovement(req.body);
    res.status(201).json(movement);
  } catch (err) {
    next(err);
  }
});
