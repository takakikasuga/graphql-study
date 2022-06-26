import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server';
import { Query, Mutation, Profile } from './resolvers';
import { typeDefs } from './schema';
import { Context } from './types';
import { getUserFromToken } from './utils/getUserFromToken';

export const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Profile
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
