import jwt from 'jsonwebtoken';
import { JWT_SIGNATURE } from '../keys';

export const getUserFromToken = (token?: string) => {
  try {
    if (!token) {
      throw new Error("Token don't contain headers");
    }
    return jwt.verify(token, JWT_SIGNATURE) as {
      userId: number;
    };
  } catch (err) {
    console.error(err);
    return null;
  }
};
