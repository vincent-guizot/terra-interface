import { Router, Request, Response, NextFunction } from 'express';
import { CatalogService } from './catalog.service';
import { prisma } from '../../prisma/prisma.service';

export const catalogRouter = Router();
const service = new CatalogService(prisma);

catalogRouter.get('/products', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const products = await service.getProducts(req.query.category as string);
    res.json(products);
  } catch (err) {
    next(err);
  }
});

catalogRouter.post('/products', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const product = await service.createProduct(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
});

catalogRouter.post('/units/convert', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await service.convertUnit(req.body);
    res.json(result);
  } catch (err) {
    next(err);
  }
});
