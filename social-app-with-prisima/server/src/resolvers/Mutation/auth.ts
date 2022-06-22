import validator from 'validator';
import type { Context, SignupArgs, UserPayloadType } from '../../types';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SIGNATURE } from '../../keys';

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
        token: null
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
        token: null
      };
    }

    if (!name || !bio) {
      return {
        userErrors: [
          {
            message: 'Invalid name or bio'
          }
        ],
        token: null
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { email, name, password: hashedPassword }
    });
    console.log({ user });

    await prisma.profile.create({
      data: {
        userId: user.id,
        bio
      }
    });

    const token = jwt.sign(
      {
        userId: user.id
      },
      JWT_SIGNATURE,
      {
        expiresIn: 3600000
      }
    );

    return {
      userErrors: [],
      token
    };
  }
};
