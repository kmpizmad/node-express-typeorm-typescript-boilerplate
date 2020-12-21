import { env } from 'process';
import { createClient } from 'redis';

export const redis = createClient((env.REDIS_PORT! as any) || 6379);
