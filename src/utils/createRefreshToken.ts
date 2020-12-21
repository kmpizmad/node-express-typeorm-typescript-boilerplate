import { sign } from 'jsonwebtoken';
import { env } from 'process';
import { User } from '../db/models/User';

export const createRefreshToken = (user: User) => {
  return sign(
    { userId: user.id, tokenVersion: user.tokenVersion },
    env.JWT_REFRESH_TOKEN_SECRET!,
    {
      expiresIn: '7d',
    }
  );
};
