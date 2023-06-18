import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

dotenv.config();
export const authToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHead = req.headers.authorization;
    const token = authHead ? authHead.split(' ')[1] : '';

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string);

    next();
  } catch (err) {
    res.status(401);
    res.json('Access denied, invalid token');
    return;
  }
};
