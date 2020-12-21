import { Router } from 'express';
import { User } from '../../../db/models/User';
import { isExistsOn } from '../../../middlewares';
import { login } from './login.handlers';

export const router = Router();

router.route('/').post(isExistsOn(User), login.post!);
