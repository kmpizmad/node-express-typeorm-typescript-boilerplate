import { NextFunction, Request, Response, Router } from 'express';

export const router = Router();

router.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
  res.json({ message: 'Hello from uploads route!' });
});
