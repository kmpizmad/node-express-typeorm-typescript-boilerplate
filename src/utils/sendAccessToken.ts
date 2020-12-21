import { Response } from 'express';

export const sendAccessToken = (
  res: Response,
  status: boolean,
  token: string,
) => {
  res.json({ ok: status, accessToken: token });
};
