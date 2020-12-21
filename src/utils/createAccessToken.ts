import { sign } from 'jsonwebtoken';
import { env } from 'process';
import { User } from '../db/models/User';

export const createAccessToken = (user: User) => {
  return sign({ user: user.id }, env.JWT_ACCESS_TOKEN_SECRET!, {
    expiresIn: '5m',
  });
};
