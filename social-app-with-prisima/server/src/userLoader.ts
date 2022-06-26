import type { User } from '@prisma/client';
import Dataloader from 'dataloader';
import { prisma } from '.';
import type { BatchUsers } from './types';

const batchUsers: BatchUsers = async (ids) => {
  console.log('ids === ', ids);
  const users = await prisma.user.findMany({
    where: {
      id: {
        in: ids
      }
    }
  });
  console.log('users === ', users);
  const userMap: { [key: string]: User } = {};

  users.forEach((user) => {
    userMap[user.id] = user;
  });

  return ids.map((id) => userMap[id]);
};

// @ts-ignore
export const userLoader = new Dataloader<number, User>(batchUsers);
