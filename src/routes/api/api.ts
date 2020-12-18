import { NextFunction, Request, Response, Router } from 'express';
import { router as userController } from './controllers/user/user';

export const router = Router();

router.get('/', (_req: Request, res: Response, _next: NextFunction) => {
  res.json({ message: 'Hello World!' });
});

router.use('/users', userController);
