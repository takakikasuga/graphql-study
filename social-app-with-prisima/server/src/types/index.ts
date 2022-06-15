import type { Prisma } from '@prisma/client';
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
