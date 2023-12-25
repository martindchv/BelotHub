import { Router } from 'express';
import { requestHandler } from '../lib/request-handler.js';

export const exampleRouter = Router();
// Initialize needed services
// const exampleService = new ExampleService();

exampleRouter.get(
  '/test',
  requestHandler(async (req, res) => {
    res.status(200).json({ hello: 'world' });
  }),
);
