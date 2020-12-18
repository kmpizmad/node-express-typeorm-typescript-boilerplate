import { BaseEntity, EntityTarget, getRepository } from 'typeorm';
import { Controller } from '../types/api';
import { HttpResponse } from '../types/HttpResponse';

export const isExistsOn = (model: EntityTarget<BaseEntity>) => {
  const isExists: Controller = async (req, res, next) => {
    if (
      req.params.id &&
      !!(await getRepository(model).findOne(req.params.id))
    ) {
      next();
    } else {
      const err = new Error("Requested item doesn't exist");
      res.status(HttpResponse.Error.NotFound);
      next(err);
    }
  };

  return isExists;
};
