import 'dotenv/config';
import { connect } from './db/database';
import { startServer } from './server/server';

connect();
startServer();
