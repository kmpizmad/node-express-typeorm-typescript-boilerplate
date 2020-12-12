import { NextFunction, Request, Response } from 'express';
import { env } from 'process';

export const notFoundHandler = (
  _req: Request,
  _res: Response,
  next: NextFunction
) => {
  const err: any = new Error('Not found');
  err.status = 404;
  next(err);
};

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const errCode = req.statusCode === 200 ? 500 : req.statusCode;

  res.json({
    message: err.message,
    status: errCode,
    stack: env.NODE_ENV !== 'production' ? err.stack : '❌',
  });
};
