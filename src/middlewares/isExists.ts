import { BaseEntity, EntityTarget, getRepository } from 'typeorm';
import { Controller } from '../types/api';
import { HttpResponse } from '../types/HttpResponse';

export const isExistsOn = (
  model: EntityTarget<BaseEntity>,
  errorOnExist?: boolean
) => {
  const isExists: Controller = async (req, res, next) => {
    const repo = getRepository(model);
    const condition =
      (req.params.id && !!(await repo.findOne(req.params.id))) ||
      (
        await repo.find({
          where: [{ username: req.body.username }, { email: req.body.email }],
        })
      ).length === 0;

    const message = errorOnExist
      ? 'Requested item already exists'
      : "Requested item doesn't exist";

    const code = errorOnExist
      ? HttpResponse.Error.Conflict
      : HttpResponse.Error.NotFound;

    if (!condition) {
      const err = new Error(message);
      res.status(code);
      next(err);
    } else {
      next();
    }
  };

  return isExists;
};
