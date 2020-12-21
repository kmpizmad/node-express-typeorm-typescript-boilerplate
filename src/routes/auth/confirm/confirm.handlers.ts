import { verify } from 'jsonwebtoken';
import { env } from 'process';
import { User } from '../../../db/models/User';
import { userRepo } from '../../../db/repos';
import { redis } from '../../../server/redis';
import { ControllerMap } from '../../../types/api';
import { HttpResponse } from '../../../types/HttpResponse';
import { ApiResponse } from '../../../types/message';
import { msg } from '../../api/controllers/user/user.handlers';

export const confirm: ControllerMap = {};

confirm.get = async (req, res, next) => {
  const { token } = req.params;
  redis.setex(token, (env.JWT_ACCESS_TOKEN_EXPIRATION as any) || 900, token);

  verify(token, env.JWT_ACCESS_TOKEN_SECRET!, async (err, data) => {
    if (err) next(err);
    else {
      let code: number = HttpResponse.Success.Created;
      let response: ApiResponse = {
        status: 'created',
      };

      const { username, email, password } = data as User;
      const user = await (await userRepo()).save({ username, email, password });

      res.status(code).json({
        ...response,
        message: msg(response.status),
        data: user,
      });
    }
  });
};
