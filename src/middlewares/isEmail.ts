import * as EmailValidator from 'email-validator';
import { Controller } from '../types/api';
import { HttpResponse } from '../types/HttpResponse';

export const isEmail: Controller = async (req, res, next) => {
  if (EmailValidator.validate(req.body.email)) next();
  else {
    const err: any = new Error('Invalid email');
    res.status(HttpResponse.Error.UnprocessableEntity);
    next(err);
  }
};
