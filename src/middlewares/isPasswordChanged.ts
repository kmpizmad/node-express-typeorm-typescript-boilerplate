import { compareSync } from 'bcrypt';
import { User } from '../db/models/User';
import { Controller } from '../types/api';
import { HttpResponse } from '../types/HttpResponse';

export const isPasswordChanged: Controller = async (req, res, next) => {
  const user = await User.findOne(req.params.id);

  if (!user || (user && compareSync(req.body.password, user.password))) {
    const err = new Error('Password cannot be the same');
    res.status(HttpResponse.Error.Conflict);
    next(err);
  } else {
    next();
  }
};
