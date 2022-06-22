import validator from 'validator';
import type { Context, SignupArgs, UserPayloadType } from '../../types';
import bcrypt from 'bcryptjs';

export const authResolvers = {
  signup: async (
    _: any,
    { email, name, bio, password }: SignupArgs,
    { prisma }: Context
  ): Promise<UserPayloadType> => {
    const isEmail = validator.isEmail(email);
    if (!isEmail) {
      return {
        userErrors: [
          {
            message: 'Invalid email'
          }
        ],
        user: null
      };
    }

    const isValidPassword = validator.isLength(password, {
      min: 5
    });
    if (!isValidPassword) {
      return {
        userErrors: [
          {
            message: 'Invalid password'
          }
        ],
        user: null
      };
    }

    if (!name || !bio) {
      return {
        userErrors: [
          {
            message: 'Invalid name or bio'
          }
        ],
        user: null
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword }
    });
    console.log({ user });
    return {
      userErrors: [],
      user: null
    };
  }
};
