import { Router } from 'express';
import { checkCache } from '../../../middlewares';
import { confirm } from './confirm.handlers';

export const router = Router();

router.route('/:token').get(checkCache, confirm.get!);
