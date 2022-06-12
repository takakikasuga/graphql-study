const { ApolloServer, gql } = require('apollo-server');

/**
 *  @desc GraphQLのデザインパターン
 *  @link https://github.com/Shopify/graphql-design-tutorial/blob/master/TUTORIAL.md
 */
const typeDefs = gql`
  type Query {
    cars: [Car!]!
  }

  type Car {
    id: ID!
    color: String!
    make: String!
  }

  type ManualGroup {
    Image
    [Car]
  }

  type AutomaticGroup {
    Image
    [Car]
    [AutomaticGroupFeature]
  }

  type AutomaticGroupFeature {}
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query: {
      cars: () => [{ id: 1, color: 'blue', make: 'Toyota' }]
    }
  }
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
