import { Router } from 'express';
import { User } from '../../../db/models/User';
import { isEmail, isExistsOn } from '../../../middlewares';
import { registration } from './register.handlers';

export const router = Router();

router.route('/').post(isExistsOn(User, true), isEmail, registration.post!);
