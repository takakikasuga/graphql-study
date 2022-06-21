import type { Context, PostArgs, PostPayloadType } from '../types';

export const Mutation = {
  postCreate: async (
    _: any,
    { post: { title, content } }: PostArgs,
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
  },
  postUpdate: async (
    _: any,
    {
      postId,
      post: { title, content }
    }: { postId: string; post: PostArgs['post'] },
    { prisma }: Context
  ): Promise<PostPayloadType> => {
    console.log({ postId, type: typeof postId });
    if (!title && !content) {
      return {
        userErrors: [
          {
            message: 'Need to have at least on e field filled'
          }
        ],
        post: null
      };
    }

    const existingPost = await prisma.post.findUnique({
      where: {
        id: Number(postId)
      }
    });

    if (!existingPost) {
      return {
        userErrors: [
          {
            message: 'Post does not exist'
          }
        ],
        post: null
      };
    }

    const post = await prisma.post.update({
      where: {
        id: Number(postId)
      },
      data: {
        title,
        content
      }
    });

    return {
      userErrors: [],
      post
    };
  },
  postDelete: async (
    _: any,
    { postId }: { postId: string },
    { prisma }: Context
  ): Promise<PostPayloadType> => {
    const existingPost = await prisma.post.findUnique({
      where: {
        id: Number(postId)
      }
    });

    if (!existingPost) {
      return {
        userErrors: [
          {
            message: 'Post does not exist'
          }
        ],
        post: null
      };
    }

    const post = await prisma.post.delete({
      where: {
        id: Number(postId)
      }
    });

    return {
      userErrors: [],
      post
    };
  }
};
