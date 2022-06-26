import type { Context, PostArgs, PostPayloadType } from '../../types';
import { canUserMutatePost } from '../../utils/canUserMutatePost';

export const postResolvers = {
  postCreate: async (
    _: any,
    { post: { title, content } }: PostArgs,
    { prisma, userInfo }: Context
  ): Promise<PostPayloadType> => {
    if (!userInfo) {
      return {
        userErrors: [
          {
            message: 'Forbidden access (unauthenticated)'
          }
        ],
        post: null
      };
    }

    if (!title || !content) {
      return {
        userErrors: [],
        post: null
      };
    }

    const post = await prisma.post.create({
      data: {
        title,
        content,
        authorId: userInfo.userId
      }
    });
    console.log(post);
    console.log(userInfo);
    return {
      userErrors: [
        {
          message: 'Title and content are required.'
        }
      ],
      post
    };
  },
  postUpdate: async (
    _: any,
    {
      postId,
      post: { title, content }
    }: { postId: string; post: PostArgs['post'] },
    { prisma, userInfo }: Context
  ): Promise<PostPayloadType> => {
    if (!userInfo) {
      return {
        userErrors: [
          {
            message: 'Forbidden access (unauthenticated)'
          }
        ],
        post: null
      };
    }

    const error = await canUserMutatePost({
      userId: userInfo.userId,
      postId: Number(postId),
      prisma
    });

    if (error) {
      return error;
    }

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
    { prisma, userInfo }: Context
  ): Promise<PostPayloadType> => {
    if (!userInfo) {
      return {
        userErrors: [
          {
            message: 'Forbidden access (unauthenticated)'
          }
        ],
        post: null
      };
    }

    const error = await canUserMutatePost({
      userId: userInfo.userId,
      postId: Number(postId),
      prisma
    });

    if (error) {
      return error;
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

    const post = await prisma.post.delete({
      where: {
        id: Number(postId)
      }
    });

    return {
      userErrors: [],
      post
    };
  },
  postPublish: async (
    _: any,
    { postId }: { postId: string },
    { prisma, userInfo }: Context
  ): Promise<PostPayloadType> => {
    if (!userInfo) {
      return {
        userErrors: [
          {
            message: 'Forbidden access (unauthenticated)'
          }
        ],
        post: null
      };
    }

    const error = await canUserMutatePost({
      userId: userInfo.userId,
      postId: Number(postId),
      prisma
    });

    if (error) {
      return error;
    }

    const post = await prisma.post.update({
      where: {
        id: Number(postId)
      },
      data: {
        published: true
      }
    });

    return {
      userErrors: [],
      post
    };
  },
  postUnpublish: async (
    _: any,
    { postId }: { postId: string },
    { prisma, userInfo }: Context
  ): Promise<PostPayloadType> => {
    if (!userInfo) {
      return {
        userErrors: [
          {
            message: 'Forbidden access (unauthenticated)'
          }
        ],
        post: null
      };
    }

    const error = await canUserMutatePost({
      userId: userInfo.userId,
      postId: Number(postId),
      prisma
    });

    if (error) {
      return error;
    }

    const post = await prisma.post.update({
      where: {
        id: Number(postId)
      },
      data: {
        published: false
      }
    });

    return {
      userErrors: [],
      post
    };
  }
};
