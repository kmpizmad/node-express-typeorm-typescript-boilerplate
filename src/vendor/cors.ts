import cors from 'cors';
import { corsOptions } from '../utils/constants';

export default () => cors(corsOptions);
