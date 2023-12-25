import convict from 'convict';
import { config as envConfig } from 'dotenv';
import lodash from 'lodash';
const { isString } = lodash;
envConfig();

function nonEmptyString(arg, schema) {
  if (!isString(arg) || arg === '') {
    throw new Error(`Value for ${schema.env} is not a string or is empty`);
  }
}

const config = convict({
  db: {
    host: {
      doc: 'DB Host',
      env: 'PG_HOST',
      format: String,
      default: 'localhost',
    },
    port: {
      doc: 'DB Port',
      env: 'PG_PORT',
      format: 'port',
      default: 5432,
    },
    user: {
      doc: 'DB User',
      env: 'PG_USER',
      format: nonEmptyString,
      default: '',
    },
    password: {
      doc: 'DB Password',
      env: 'PG_PASSWORD',
      format: nonEmptyString,
      default: '',
    },
    database: {
      doc: 'DB Name',
      env: 'PG_DATABASE',
      format: String,
      default: 'belot-hub',
    },
  },
  jwt: {
    secret: {
      doc: 'Secret key for JWT',
      env: 'JWT_SECRET',
      default: '',
    },
  },
  server: {
    port: {
      doc: 'Application server port',
      env: 'SERVER_PORT',
      format: 'port',
      default: 8080,
    },
  },
});

config.validate({ allowed: 'strict' });

export { config };
