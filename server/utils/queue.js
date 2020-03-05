// @flow
import Redis from 'ioredis';
import Queue from 'bull';
import { client, subscriber } from '../redis';

export function createQueue(name: string) {
  return new Queue(name, {
    createClient(type) {
      switch (type) {
        case 'client':
          return client;
        case 'subscriber':
          return subscriber;
        default:
          return new Redis({
            host: process.env.REDIS_HOST,
            password: process.env.REDIS_PASSWORD,
            port: process.env.REDIS_PORT,
            db: process.env.REDIS_DB,
            tls: { checkServerIdentity: () => undefined },
          });
      }
    },
  });
}
