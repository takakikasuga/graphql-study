import type { Context } from '../types';

export const Query = {
  me: async (_: any, __: any, { prisma, userInfo }: Context) => {
    if (!userInfo) {
      return null;
    }

    return await prisma.user.findUnique({
      where: {
        id: userInfo.userId
      }
    });
  },
  posts: async (_: any, __: any, { prisma }: Context) => {
    const posts = await prisma.post.findMany({
      orderBy: [
        {
          createdAt: 'desc'
        }
      ]
    });

    return posts;
  }
};
