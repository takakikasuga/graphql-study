import type { Context, PostCreateArgs, PostPayloadType } from '../types';

export const Mutation = {
  postCreate: async (
    _: any,
    { title, content }: PostCreateArgs,
    { prisma }: Context
  ): Promise<PostPayloadType> => {
    if (!title || !content) {
      return {
        userErrors: [
          {
            message: 'Title and content are required.'
          }
        ],
        post: null
      };
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: 1
      }
    });

    return {
      userErrors: [],
      post
    };
  }
};
