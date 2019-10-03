// @flow
require('./init');

if (
  !process.env.SECRET_KEY ||
  process.env.SECRET_KEY === 'generate_a_new_key'
) {
  console.error(
    'The SECRET_KEY env variable must be set with the output of `openssl rand -hex 32`'
  );
  // $FlowFixMe
  process.exit(1);
}

if (process.env.AWS_ACCESS_KEY_ID) {
  [
    'AWS_REGION',
    'AWS_SECRET_ACCESS_KEY',
    'AWS_S3_UPLOAD_BUCKET_URL',
    'AWS_S3_UPLOAD_BUCKET_NAME',
    'AWS_S3_UPLOAD_MAX_SIZE',
  ].forEach(key => {
    if (!process.env[key]) {
      console.error(`The ${key} env variable must be set when using AWS`);
      // $FlowFixMe
      process.exit(1);
    }
  });
}

if (process.env.SLACK_KEY) {
  if (!process.env.SLACK_SECRET) {
    console.error(
      `The SLACK_SECRET env variable must be set when using Slack Sign In`
    );
    // $FlowFixMe
    process.exit(1);
  }
}

if (!process.env.URL) {
  console.error(
    'The URL env variable must be set to the externally accessible URL, e.g (https://www.getoutline.com)'
  );
  // $FlowFixMe
  process.exit(1);
}

if (!process.env.DATABASE_URL) {
  console.error(
    'The DATABASE_URL env variable must be set to the location of your postgres server, including authentication and port'
  );
  // $FlowFixMe
  process.exit(1);
}

if (
  !process.env.REDIS_HOST ||
  !process.env.REDIS_PASSWORD ||
  !process.env.REDIS_DB ||
  !process.env.REDIS_PORT
) {
  console.error(
    'The REDIS_HOST, REDIS_PASSWORD, REDIS_DB and REDIS_PORT env variables must be set to the location of your redis server'
  );
  // $FlowFixMe
  process.exit(1);
}

if (!process.env.WEBSOCKETS_ENABLED) {
  console.log(
    'WARNING: Websockets are disabled. Set WEBSOCKETS_ENABLED env variable to true to enable'
  );
}

if (process.env.NODE_ENV === 'production') {
  console.log('\n\x1b[33m%s\x1b[0m', 'Running Outline in production mode.');
} else if (process.env.NODE_ENV === 'development') {
  console.log(
    '\n\x1b[33m%s\x1b[0m',
    'Running Outline in development mode with hot reloading. To run Outline in production mode set the NODE_ENV env variable to "production"'
  );
}

require('./server');
