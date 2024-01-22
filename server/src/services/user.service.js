import { AuthService } from "./auth.service.js";
import { tables } from "../constants/db.js";

export const UserService = (knex) => {

  const authService = AuthService();

  const findUser = ({ email, username }) => {
    return knex(tables.USER)
      .select('id', 'email', 'username', 'password', 'display_name')
      .where((builder) => {
        builder.where({
          ...(email ? { email } : { username })
        });
      })
      .then(userRes => userRes[0] || null);
  };

  const findUserById = (id) => {
    return knex(tables.USER)
      .select('id', 'email', 'username', 'password', 'display_name')
      .where({ id })
      .then(userRes => userRes[0] || null);
  }

  const userExists = ({ email, username, displayName }) => {
    return knex(tables.USER)
      .select('email', 'username', 'display_name')
      .where((builder) => {
        builder.where({ email });

        if (username) {
          builder.orWhere({ username });
        }
        if (displayName) {
          builder.orWhere({ display_name: displayName })
        }
      })
      .then(userRes => Boolean(userRes[0] || null));
  };

  const createUser = async ({ email, password, username, displayName }) => {
    const hashedPassword = await authService.cryptPassword(password);
    const userRes = await knex(tables.USER)
      .insert(
        { email, password: hashedPassword, username, display_name: displayName },
        ['email', 'username', 'display_name']
      );

    return userRes[0];
  };


  return {
    findUser,
    findUserById,
    userExists,
    createUser
  }

}