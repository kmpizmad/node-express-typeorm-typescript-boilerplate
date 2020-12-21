import { compareSync } from 'bcrypt';
import { userRepo } from '../db/repos';
import { Controller } from '../types/api';
import { HttpResponse } from '../types/HttpResponse';

export const isPasswordChanged: Controller = async (req, res, next) => {
  const user = await (await userRepo()).findOne(req.params.id);

  if (compareSync(req.body.password, user!.password)) {
    const err = new Error('Password cannot be the same');
    res.status(HttpResponse.Error.Conflict);
    next(err);
  } else if (req.body.username || req.body.email) {
    const fields = [req.body.username, req.body.email]
      .filter((field) => !!field)
      .join(', ');
    const err = new Error(`Invalid field(s): ${fields}`);
    res.status(HttpResponse.Error.Forbidden);
    next(err);
  } else {
    next();
  }
};
