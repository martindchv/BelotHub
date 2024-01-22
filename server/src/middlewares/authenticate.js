import jwt from 'jsonwebtoken'

import { AUTH_COOKIE_NAME } from "../routers/auth-router.js";
import { JWT_SECRET } from "../services/auth.service.js";
import { UserService } from '../services/user.service.js';
import * as message from '../constants/response-messages.js';

export const authenticate = (knex) => {
    const userService = UserService(knex);
    return (req, res, next) => {
        const authCookie = req.cookies[AUTH_COOKIE_NAME]

        if (!authCookie) {
            res.status(401).send(message.INVALID_SESSION);
            return;
        }

        jwt.verify(authCookie, JWT_SECRET, async (err, decoded) => {
            if (err) {
                res.status(401).send(message.INVALID_SESSION);
            }

            const userId = decoded.data.id;
            const user = await userService.findUserById(userId);

            res.locals.user = user;
            next();
        })
    }
}
