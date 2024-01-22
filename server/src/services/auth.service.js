import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const SALT_ROUNDS = 10;
const JWT_EXP_TIME = 1 * 60 * 1000;

export const JWT_SECRET = 'some-very-secret-secret'

export const AuthService = () => {

  const cryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);

    return hashedPassword;
  };

  const comparePassword = async (password, hashedPassword) => {
    const passwordsMatch = await bcrypt.compare(password, hashedPassword);
    return passwordsMatch;
  };

  const generateToken = (user) => {
    const token = jwt.sign({
      exp: Date.now() + JWT_EXP_TIME,
      data: { id: user.id }
    }, JWT_SECRET);

    return token;
  }

  return {
    cryptPassword,
    comparePassword,
    generateToken
  }

}