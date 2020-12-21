import { Router } from 'express';
import { logout } from './logout.handlers';

export const router = Router();

router.route('/').post(logout.post!);
