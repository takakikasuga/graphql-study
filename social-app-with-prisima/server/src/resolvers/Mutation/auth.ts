import type {
  Context,
  PostArgs,
  PostPayloadType,
  SignupArgs
} from '../../types';

export const authResolvers = {
  signup: async (
    _: any,
    { email, name, bio, password }: SignupArgs,
    { prisma }: Context
  ) => {
    const user = await prisma.user.create({
      data: { email, name, password }
    });
    console.log({ user });
    return user;
  }
};
