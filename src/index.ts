import 'dotenv/config';
import { connectToDatabase } from './db/database';
import { startServer } from './server/server';

connectToDatabase();
startServer();
