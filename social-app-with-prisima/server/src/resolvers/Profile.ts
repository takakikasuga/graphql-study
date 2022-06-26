import type { Context, ProfileParentType } from '../types';

export const Profile = {
  user: async (parent: ProfileParentType, __: any, { prisma }: Context) => {
    console.log('parent === ', parent);
    const user = await prisma.user.findUnique({
      where: {
        id: parent.userId
      }
    });
    console.log('user === ', user);
    return user;
  }
};
