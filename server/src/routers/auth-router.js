import { Router } from 'express';

import { requestHandler } from '../lib/request-handler.js';
import { UserService } from '../services/user.service.js';
import { AuthService } from '../services/auth.service.js';
import { authenticate } from '../middlewares/authenticate.js';
import * as messages from '../constants/response-messages.js';
import { endpoint } from '../constants/endpoints.js';

export const AUTH_COOKIE_NAME = 'auth';

export const authRouter = (knex) => {
  const userService = UserService(knex);
  const authService = AuthService();
  const authRouter = Router();

  authRouter.get(
    '',
    authenticate(knex),
    requestHandler(async (req, res) => {
      const { id, password, ...user } = res.locals.user;
      res.status(200).json(user);
    }),
  );

  authRouter.post(
    endpoint.REGISTER,
    requestHandler(async (req, res) => {
      const { email, password, username, displayName } = req.body;

      if (!email || !password || !username || !displayName) {
        res
          .status(400)
          .send(messages.INVALID_REQUEST_BODY);
        return;
      }

      const userExists = await userService.userExists({ email, username, displayName });
      if (userExists) {
        res
          .status(400)
          .send(messages.USER_ALREADY_EXISTS);
        return;
      }

      const newUser = await userService.createUser({ email, password, username, displayName });
      if (!newUser) {
        res.status(400).end();
        return;
      }

      res.status(200).json(newUser);
    }),
  );

  authRouter.post(
    endpoint.LOGIN,
    requestHandler(async (req, res) => {
      const { email, username, password } = req.body;

      if ((!email && !username) || !password) {
        res
          .status(400)
          .send(messages.INVALID_REQUEST_BODY);
      }

      const user = await userService.findUser({ email, username });

      if (!user) {
        res
          .status(404)
          .send(messages.USER_NOT_FOUND);
      }

      const passwordsMatch = await authService.comparePassword(password, user.password);

      if (!passwordsMatch) {
        res
          .status(400)
          .send(messages.WRONG_PASSWORD);
      }

      const token = authService.generateToken(user);
      const { id, password: userPassword, ...resUser } = user;
      res
        .cookie(AUTH_COOKIE_NAME, token)
        .status(200)
        .json(resUser);
    }),
  );

  authRouter.post(
    endpoint.LOGOUT,
    requestHandler(async (req, res) => {
      res
        .clearCookie(AUTH_COOKIE_NAME)
        .status(200)
        .end();
    }),
  );

  return authRouter;
}