import { NextFunction, Request, Response, Router } from 'express';

export const router = Router();

router.get('/', async (_req: Request, res: Response, _next: NextFunction) => {
  res.json({ message: 'Hello from users route!' });
});

router.post(
  '/',
  async (_req: Request, _res: Response, _next: NextFunction) => {}
);

router.patch(
  '/',
  async (_req: Request, _res: Response, _next: NextFunction) => {}
);

router.delete(
  '/',
  async (_req: Request, _res: Response, _next: NextFunction) => {}
);
