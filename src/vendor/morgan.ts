import morgan from 'morgan';
import { stream } from '../server/logger';

export default () =>
  morgan(
    'IP address: :remote-addr, user: :remote-user | HTTP/:http-version :method :url responded with :status - :response-time[2] ms - :user-agent',
    { stream }
  );
