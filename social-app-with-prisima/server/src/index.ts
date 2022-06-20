import { PrismaClient } from '@prisma/client';
import { ApolloServer } from 'apollo-server';
import { Query, Mutation } from './resolvers';
import { typeDefs } from './schema';

export const prisma = new PrismaClient();

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation
  },
  context: {
    prisma
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
