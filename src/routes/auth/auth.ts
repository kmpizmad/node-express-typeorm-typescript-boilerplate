import { Router } from 'express';
import { router as loginRouter } from './login/login';
import { router as logoutRouter } from './logout/logout';
import { router as registerRouter } from './register/register';
import { router as confirmRouter } from './confirm/confirm';

export const router = Router();

router.use('/login', loginRouter);
router.use('/logout', logoutRouter);
router.use('/register', registerRouter);
router.use('/confirm', confirmRouter);
