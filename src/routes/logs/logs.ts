import { NextFunction, Request, Response, Router } from 'express';
import { today } from '../../utils/constants';
import { readLineAsync } from '../../utils/readLineAsync';

export const router = Router();

router.get('/', async (_req: Request, res: Response, next: NextFunction) => {
  const logs: any[] = [];

  try {
    await readLineAsync(today, (line) => logs.push(JSON.parse(line)));
    res.json({
      logs,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/:day', async (req: Request, res: Response, next: NextFunction) => {
  const logs: any[] = [];

  try {
    await readLineAsync(req.params.day, (line) => logs.push(JSON.parse(line)));
    res.json({
      logs,
    });
  } catch (err) {
    next(err);
  }
});
