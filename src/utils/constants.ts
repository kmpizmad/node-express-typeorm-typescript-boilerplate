import { env } from 'process';
import { CorsOptions } from 'cors';
import { format } from 'winston';

export const today = new Date().toISOString().substring(0, 10);

export const corsOptions: CorsOptions = {
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
  origin: env.CORS_ORIGIN,
  preflightContinue: false,
};

export const loggerFileOptions = {
  level: 'info',
  filename: `src/assets/logs/${today}.log`,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.json()
  ),
  handleExceptions: true,
  maxsize: 5242880,
  maxFiles: 5,
};

export const loggerConsoleOptions = {
  level: 'debug',
  handleExceptions: true,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.colorize(),
    format.simple()
  ),
};
