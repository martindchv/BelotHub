import cors from 'cors';
import cookieParser from 'cookie-parser';
import express, { json } from 'express';
import Knex from 'knex';
import { Model } from 'objection';
import knexConfig from '../knexfile.js';
import { config } from './config.js';
import { requestsLogger } from './middlewares/requests-logger.js';
import { authenticate } from './middlewares/authenticate.js';
import { exampleRouter } from './routers/example-router.js';
import { authRouter } from './routers/auth-router.js';

const knexClient = Knex(knexConfig.development);
Model.knex(knexClient);

const app = express();

app.use(cors());
app.use(json());
app.use(cookieParser())

app.use(requestsLogger);

app.use('/auth', authRouter(knexClient));
app.use('/example', authenticate(knexClient), exampleRouter);

// TO DO: Implement error handling
// app.use(errorHandler);

const port = config.get('server.port');
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
