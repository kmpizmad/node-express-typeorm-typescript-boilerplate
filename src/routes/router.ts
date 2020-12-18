import { Router } from 'express';
import { router as apiRouter } from './api/api';
import { router as authRouter } from './auth/auth';
import { router as logsRouter } from './logs/logs';

export const router = Router();

router.use('/api', apiRouter);
router.use('/auth', authRouter);
router.use('/logs', logsRouter);
