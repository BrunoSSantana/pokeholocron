/* eslint-disable consistent-return */
import dotenv from 'dotenv';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

dotenv.config();

interface IPayload {
  id: string;
}

export function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction,
): any {
  const token = request.headers.authorization.split(' ')[1];

  if (!token) {
    return response.status(401).end();
  }

  try {
    const { id } = verify(
      token,
      process.env.SECRET_kEY,
    ) as IPayload;

    request.trainer_id = id;

    next();
  } catch (error) {
    return response.status(401).end();
  }
}
