import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server';
import { Query, Mutation } from './resolvers';
import { typeDefs } from './schema';
import { Context } from './types';
import { getUserFromToken } from './utils/getuserFromToken';

export const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation
  },
  context: ({ req }): Context => {
    const userInfo = getUserFromToken(req.headers.authorization);
    return {
      prisma,
      userInfo
    };
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
