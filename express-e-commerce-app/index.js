const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
  type Query {
    # スカラー定義の場合タイプからNullを定義することになる。
    # Nullを許容しない場合は、「!(nonNullAssertion)」を付与する。
    hello: String!
    numberOfAnimals: Int
    price: Float
    isCool: Boolean
    helloArray: [String!]!
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return 'World!!';
    },
    numberOfAnimals: () => {
      return 10;
    },
    price: () => {
      return 1.111;
    },
    isCool: () => false,
    helloArray: () => {
      return ['Hello', 'my', 'Friend'];
    }
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log('Server is ready at ', url);
});
