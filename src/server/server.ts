import { env } from 'process';

import express, { Application } from 'express';
import { white, cyan, yellow } from 'chalk';

import cors from '../vendor/cors';
import helmet from '../vendor/helmet';
import morgan from '../vendor/morgan';
import { json, urlencoded } from 'body-parser';

import { router } from '../routes/router';
import { errorHandler, notFoundHandler } from '../middlewares/errorHandlers';

const server: Application = express();
const port = env.PORT || 8000;

// Use middlewares
server.use(cors());
server.use(helmet());
server.use(morgan());
server.use(urlencoded({ extended: false }));
server.use(json());

// Routes
server.use('/', router);
server.use(notFoundHandler);
server.use(errorHandler);

// Start server
export const startServer = () => {
  server.listen(port, () => {
    console.log(yellow('Server started on port'), white(port));
    console.log(
      cyan('Check out your server:'),
      white(`http://localhost:${port}/`)
    );
  });
};
