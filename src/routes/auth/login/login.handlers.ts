import { compare } from 'bcrypt';
import { userRepo } from '../../../db/repos';
import { ControllerMap } from '../../../types/api';
import { HttpResponse } from '../../../types/HttpResponse';
import { createAccessToken } from '../../../utils/createAccessToken';
import { createRefreshToken } from '../../../utils/createRefreshToken';
import { sendAccessToken } from '../../../utils/sendAccessToken';
import { sendRefreshToken } from '../../../utils/sendRefreshToken';

export const login: ControllerMap = {};

login.post = async (req, res, next) => {
  const { username, password } = req.body;

  // Tries to authenticate user or responds with error
  try {
    const user = await (await userRepo()).findOneOrFail({ username });
    if (await compare(password, user.password)) {
      sendRefreshToken(res, createRefreshToken(user));
      sendAccessToken(res, true, createAccessToken(user));
    } else {
      const err: any = new Error('Password is incorrect');
      err.name = 'ERR_NO_MATCH';
      err.code = HttpResponse.Error.Unauthorized;

      next(err);
    }
  } catch (err) {
    next(err);
  }
};
