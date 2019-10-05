// @flow
import redis from 'redis';

const client = redis.createClient(process.env.REDIS_URL, {
  tls: { checkServerIdentity: () => undefined },
});

export { client };
