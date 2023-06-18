import { UserStore } from './../models/user';
import { authToken } from './../authen/auth';
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const store = new UserStore();

const index = async (req: Request, res: Response) => {
  try {
    const users = await store.index();
    res.json(users);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const show = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    if (!isNaN(id)) {
      const user = await store.show(id);
      res.json(user);
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
    const user = await store.create(req.body);
    const token = jwt.sign(user, process.env.TOKEN_SECRET as string);
    res.json(token);
  } catch (error) {
    res.status(400);
    res.json(error);
  }
};

const userRoutes = (app: express.Application) => {
  app.get('/users', authToken, index);
  app.get('/user/:id', authToken, show);
  app.post('/user', create);
};

export default userRoutes;
