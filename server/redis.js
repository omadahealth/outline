// @flow
import Redis from 'ioredis';

const client = new Redis({
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  port: process.env.REDIS_PORT,
  db: process.env.REDIS_DB,
  tls: { checkServerIdentity: () => undefined },
});
const subscriber = new Redis({
  host: process.env.REDIS_HOST,
  password: process.env.REDIS_PASSWORD,
  port: process.env.REDIS_PORT,
  db: process.env.REDIS_DB,
  tls: { checkServerIdentity: () => undefined },
});

export { client, subscriber };
