// @flow
import redis from 'redis';

const client = redis.createClient({
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  port: process.env.REDIS_PORT,
  db: process.env.REDIS_DB,
  tls: { checkServerIdentity: () => undefined },
});

export { client };
