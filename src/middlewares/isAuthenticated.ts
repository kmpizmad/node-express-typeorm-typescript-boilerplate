import { Controller } from '../types/api';
import { HttpResponse } from '../types/HttpResponse';
import { env } from 'process';
import * as jwt from 'jsonwebtoken';

export const isAuthenticated: Controller = async (req, res, next) => {
  const authorization = req.headers.authorization;
  const err = new Error('Unauthenticated');
  err.name = 'ERR_NO_USER';

  if (!authorization) {
    res.status(HttpResponse.Error.Unauthorized);
    next(err);
  } else {
    const bearer = authorization.split(' ')[0];

    if (bearer.toLowerCase() === 'bearer') {
      const token = authorization.split(' ')[1];

      try {
        jwt.verify(token, env.JWT_SECRET || 'JWT_SECRET');
        next();
      } catch (err) {
        res.status(HttpResponse.Error.Unauthorized);
        next(err);
      }
    }
  }
};
