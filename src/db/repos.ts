import { getConnection } from 'typeorm';
import { environment } from '../utils/constants';
import { User } from './models/User';

export const userRepo = async () =>
  await getConnection(environment()).getRepository(User);
