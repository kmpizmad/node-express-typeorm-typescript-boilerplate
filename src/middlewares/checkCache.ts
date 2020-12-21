import { redis } from '../server/redis';
import { Controller } from '../types/api';
import { HttpResponse } from '../types/HttpResponse';

export const checkCache: Controller = async (req, res, next) => {
  const { id, token } = req.params;

  if (!!id) {
    redis.get(id, (err, data) => {
      if (err) next(err);
      else {
        if (data !== null) res.json(JSON.parse(data));
        else next();
      }
    });
  }

  if (!!token) {
    redis.get(token, (err, data) => {
      if (err) next(err);
      else if (data !== null) {
        const err: any = new Error('This token has been used');
        err.name = 'ERR_TOKEN_USED';
        res.status(HttpResponse.Error.Conflict);
        next(err);
      } else next();
    });
  }
};
