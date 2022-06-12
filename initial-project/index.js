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

  type Group {
    id: ID!
    featureSet: GroupFeatureSet
    cars(skip: Int!, take: Int!): [Car!]!
    name: String!
    image: Image!
    bodyHtml: String!
  }

  type Image {
    id: ID!
    url: String!
  }

  type GroupFeatures {
    feature: String!
  }

  type GroupFeatureSet {
    features: [GroupFeatures!]!
    applyFeaturesSeparately: Boolean!
  }
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
