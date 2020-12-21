import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { env } from 'process';
import { userRepo } from '../db/repos';
import { createAccessToken } from './createAccessToken';
import { createRefreshToken } from './createRefreshToken';
import { sendAccessToken } from './sendAccessToken';
import { sendRefreshToken } from './sendRefreshToken';

export const addRefreshToken = async (req: Request, res: Response) => {
  const token = req.cookies.jid;

  if (!token) {
    return sendAccessToken(res, false, '');
  }

  let payload: any = null;
  try {
    payload = verify(token, env.JWT_REFRESH_TOKEN_SECRET!);
  } catch (err) {
    return sendAccessToken(res, false, '');
  }

  const user = await (await userRepo()).findOne({ id: payload.userId });

  if (!user) {
    return sendAccessToken(res, false, '');
  }

  if (user.tokenVersion !== payload.tokenVersion) {
    return sendAccessToken(res, false, '');
  }

  sendRefreshToken(res, createRefreshToken(user));

  return sendAccessToken(res, true, createAccessToken(user));
};
