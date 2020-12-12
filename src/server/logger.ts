import { createLogger, Logger, transports } from 'winston';
import { loggerConsoleOptions, loggerFileOptions } from '../utils/constants';

export const logger: Logger = createLogger({
  transports: [
    new transports.File(loggerFileOptions),
    new transports.Console(loggerConsoleOptions),
  ],
  exitOnError: false,
});

export const stream = {
  write: (message: string): void => {
    logger.info(message);
  },
};
