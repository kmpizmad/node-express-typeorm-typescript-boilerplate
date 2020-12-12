import { NextFunction, Request, Response, Router } from 'express';
import { router as userController } from './controllers/user/user';
import { router as uploadController } from './controllers/upload/upload';

export const router = Router();

router.get('/', (_req: Request, res: Response, _next: NextFunction) => {
  res.json({ message: 'Hello World!' });
});

router.use('/users', userController);
router.use('/upload', uploadController);
