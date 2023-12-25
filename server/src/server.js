import cors from 'cors';
import express, { json } from 'express';
import Knex from 'knex';
import { Model } from 'objection';
import knexConfig from '../knexfile.js';
import { config } from './config.js';
import { requestsLogger } from './middlewares/requests-logger.js';
// import { authenticate } from './middlewares/authenticated.js';
import { exampleRouter } from './routers/example-router.js';

const knexClient = Knex(knexConfig.development);
Model.knex(knexClient);

const app = express();

app.use(cors());
app.use(json());

app.use(requestsLogger);

// TO DO: Implement middleware to authenticate requests
// app.use(authenticate); // Every router below this line will require authentication in order to be accessed

app.use('/example', exampleRouter);

// TO DO: Implement error handling
// app.use(errorHandler);

const port = config.get('server.port');
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on port ${port}`);
});
