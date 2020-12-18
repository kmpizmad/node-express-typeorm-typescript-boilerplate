import { Router } from 'express';
import { confirm } from './confirm.handlers';

export const router = Router();

router.route('/:token').get(confirm.get!);
