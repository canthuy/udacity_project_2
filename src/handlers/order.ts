import { authToken } from '../authen/auth';
import express, { Request, Response } from 'express';

import { OrderStore } from '../models/order';

const store = new OrderStore();

const create = async (req: Request, res: Response) => {
  try {
    const order = await store.create(req.body);
    res.json(order);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getOrderByUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const status = req.query.status as string;
    let result = null;
    if (!isNaN(userId)) {
      result = await store.getOrderByUser(userId);

      res.json(result);
    } else {
      res.send('Invalid user id');
    }
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getOrderCompleteByUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    let result = null;
    if (!isNaN(userId)) {
      result = await store.getOrderCompleteByUser(userId);

      res.json(result);
    } else {
      res.send('Invalid user id');
    }
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getCurrentOrderByUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    let result = null;
    if (!isNaN(userId)) {
      result = await store.getCurrentOrderByUser(userId);
      res.json(result);
    } else {
      res.send('Invalid user id');
    }
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const getOrderActiveByUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    let result = null;
    if (!isNaN(userId)) {
      result = await store.getOrderActiveByUser(userId);
      res.json(result);
    } else {
      res.send('Invalid user id');
    }
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const orderRoutes = (app: express.Application) => {
  app.post('/order', authToken, create);
  app.get('/oder/:userId', authToken, getOrderByUser);
  app.get('/order/current/:userId', authToken, getCurrentOrderByUser);
  app.get('/order/complete/:userId', authToken, getOrderCompleteByUser);
  app.get('/order/active/:userId', authToken, getOrderActiveByUser);
};

export default orderRoutes;
