import { env } from 'process';
import 'reflect-metadata';
import {
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
} from 'typeorm';

export const connectToDatabase = () => {
  (async () => {
    await connectToDatabaseAsync();
  })();
};

export const connectToDatabaseAsync = async () => {
  const connectionOptions: ConnectionOptions = await getConnectionOptions(
    env.NODE_ENV!.trim()
  );
  return createConnection({ ...connectionOptions, name: 'default' });
};
