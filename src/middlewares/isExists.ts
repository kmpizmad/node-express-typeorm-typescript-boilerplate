import { BaseEntity, EntityTarget, getConnection } from 'typeorm';
import { Controller } from '../types/api';
import { HttpResponse } from '../types/HttpResponse';
import { environment } from '../utils/constants';

export const isExistsOn = (
  model: EntityTarget<BaseEntity>,
  errorOnExist?: boolean
) => {
  const isExists: Controller = async (req, res, next) => {
    const repo = getConnection(environment()).getRepository(model);
    const item = await repo.findOne(req.params.id);
    const items = await repo.find({
      where: [{ username: req.body.username }, { email: req.body.email }],
    });

    const conditionOnExist = items.length !== 0;
    const conditionOnMissing = !item;

    const message = errorOnExist
      ? 'Requested item already exists'
      : "Requested item doesn't exist";

    const code = errorOnExist
      ? HttpResponse.Error.Conflict
      : HttpResponse.Error.NotFound;

    if (errorOnExist ? conditionOnExist : conditionOnMissing) {
      const err = new Error(message);
      res.status(code);
      next(err);
    } else {
      next();
    }
  };

  return isExists;
};
