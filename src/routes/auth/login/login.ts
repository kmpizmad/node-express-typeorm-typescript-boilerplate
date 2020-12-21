import { Router } from 'express';
import { login } from './login.handlers';

export const router = Router();

router.route('/').post(login.post!);
