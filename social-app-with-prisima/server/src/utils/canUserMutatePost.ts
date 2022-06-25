import type { Context } from '../types';

export const canUserMutatePost = async ({
  userId,
  postId,
  prisma
}: {
  userId: number;
  postId: number;
  prisma: Context['prisma'];
}) => {
  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  });

  console.log(user);

  if (!user) {
    return {
      userErrors: [{ message: 'User not found' }],
      post: null
    };
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId
    }
  });

  console.log(post);

  if (post?.authorId !== user.id) {
    return {
      userErrors: [{ message: 'Post not owned by user' }],
      post: null
    };
  }
};
