import type { Post, Prisma, User } from '@prisma/client';
import { PrismaClient } from '@prisma/client';

export type Context = {
  prisma: PrismaClient<
    Prisma.PrismaClientOptions,
    never,
    Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
  >;
  userInfo: {
    userId: number;
  } | null;
};

export type PostArgs = {
  post: {
    title?: string;
    content?: string;
  };
};

export type PostPayloadType = {
  userErrors: {
    message: string;
  }[];
  post: Post | null;
};

export type UserPayloadType = {
  userErrors: {
    message: string;
  }[];
  token: string | null;
};

export type SignupArgs = {
  credentials: {
    email: string;
    password: string;
  };
  bio: string;
  name: string;
};

export type SigninArgs = {
  credentials: {
    email: string;
    password: string;
  };
};

export type ProfileParentType = {
  id: number;
  bio: string;
  userId: number;
};

export type PostParentType = {
  authorId: number;
};

export type UserParentType = {
  id: number;
};

export type BatchUsers = (ids: number[]) => Promise<User[]>;
