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
  profile: async (
    _: any,
    { userId }: { userId: string },
    { prisma }: Context
  ) => {
    console.log('profile');
    return await prisma.profile.findUnique({
      where: {
        userId: Number(userId)
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
