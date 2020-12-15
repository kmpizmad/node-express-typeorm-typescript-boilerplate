import { env } from 'process';
import {
  ConnectionOptions,
  createConnection,
  getConnectionOptions,
} from 'typeorm';

export const connectToDatabase = () => {
  (async () => {
    const connectionOptions: ConnectionOptions = await getConnectionOptions(
      env.NODE_ENV!.trim()
    );
    await createConnection({ ...connectionOptions, name: 'default' });
  })();
};
