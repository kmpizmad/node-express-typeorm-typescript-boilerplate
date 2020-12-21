import 'dotenv/config';
import connection from './db/database';
import { startServer } from './server/server';
import { environment } from './utils/constants';

(async () => {
  await connection.create(environment());
  await connection.runMigrations(environment());
  startServer();
})();
