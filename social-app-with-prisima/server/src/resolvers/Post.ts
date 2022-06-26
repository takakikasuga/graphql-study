import type { Context, PostParentType } from '../types';
import { userLoader } from '../userLoader';

export const Post = {
  user: async (parent: PostParentType, __: any, { prisma }: Context) => {
    console.log('Post / parent === ', parent);
    return userLoader.load(parent.authorId);
    // const user = await prisma.user.findUnique({
    //   where: {
    //     id: parent.authorId
    //   }
    // });
    // console.log('user === ', user);
    // return user;
  }
};
