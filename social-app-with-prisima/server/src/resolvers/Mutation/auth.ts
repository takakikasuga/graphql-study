import validator from 'validator';
import type {
  Context,
  SigninArgs,
  SignupArgs,
  UserPayloadType
} from '../../types';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { JWT_SIGNATURE } from '../../keys';

export const authResolvers = {
  signup: async (
    _: any,
    { credentials: { email, password }, name, bio }: SignupArgs,
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
  },
  signin: async (
    _: any,
    { credentials: { password, email } }: SigninArgs,
    { prisma }: Context
  ): Promise<UserPayloadType> => {
    console.log({ password, email });
    const user = await prisma.user.findUnique({
      where: {
        email
      }
    });
    if (!user) {
      return {
        userErrors: [
          {
            message: 'Invalid credentials'
          }
        ],
        token: null
      };
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log({ isValidPassword });
    if (!isValidPassword) {
      return {
        userErrors: [
          {
            message: 'Invalid credentials'
          }
        ],
        token: null
      };
    }

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
