import type { Context, PostCreateArgs } from '../types';

export const Mutation = {
  postCreate: async (
    _: any,
    { title, content }: PostCreateArgs,
    { prisma }: Context
  ) => {
    await prisma.post.create({
      data: {
        title,
        content,
        authorId: 1
      }
    });
  }
};
