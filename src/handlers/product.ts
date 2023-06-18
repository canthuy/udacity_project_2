import { authToken } from './../authen/auth';
import express, { Request, Response } from 'express';

import { ProductStore } from '../models/product';

const store = new ProductStore();

const index = async (req: Request, res: Response) => {
  try {
    const products = await store.index();
    res.json(products);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!isNaN(id)) {
      const product = await store.show(id);
      res.json(product);
    } else {
      res.send('Invalid id');
    }
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const create = async (req: Request, res: Response) => {
  try {
    const product = await store.create(req.body);
    res.json(product);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const productRoutes = (app: express.Application) => {
  app.get('/products', index);
  app.get('/product/:id', show);
  app.post('/product', authToken, create);
};

export default productRoutes;
