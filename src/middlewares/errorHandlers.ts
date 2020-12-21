import { NextFunction, Request, Response } from 'express';
import { env } from 'process';

export const notFoundHandler = (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  const err: any = new Error('Not found');
  err.name = 'ERR_NO_MATCH';
  res.status(404);
  next(err);
};

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  const errCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.json({
    name: err.name,
    message: err.message,
    status: errCode,
    stack: env.NODE_ENV !== 'production' ? err.stack : '❌',
  });
};
