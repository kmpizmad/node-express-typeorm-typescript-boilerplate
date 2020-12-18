import { verify } from 'jsonwebtoken';
import { env } from 'process';
import { User } from '../../../db/models/User';
import { ControllerMap } from '../../../types/api';
import { HttpResponse } from '../../../types/HttpResponse';
import { ApiResponse } from '../../../types/message';
import { msg } from '../../api/controllers/user/user.handlers';

export const confirm: ControllerMap = {};

confirm.get = async (req, res, next) => {
  verify(req.params.token, env.JWT_ACCESS_TOKEN_SECRET!, async (err, data) => {
    if (err) next(err);
    else {
      let code: number = HttpResponse.Success.Created;
      let response: ApiResponse = {
        status: 'created',
      };
      const { username, email, password } = data as User;

      User.create({ username, email, password })
        .save()
        .then((user) => {
          res.status(code).json({
            ...response,
            message: msg(response.status),
            data: user,
          });
        })
        .catch((err) => next(err));
    }
  });
};
