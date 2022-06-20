import type { Post, Prisma } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

export type Context = {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
};

export type PostCreateArgs = {
  title: string;
  content: string;
};

export type PostPayloadType = {
  userErrors: {
    message: string;
  }[];
  post: Post | null;
};
