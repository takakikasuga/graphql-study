const { ApolloServer, gql } = require('apollo-server');
const { products } = require('./data');

const typeDefs = gql`
  type Query {
    # スカラー定義の場合タイプからNullを定義することになる。
    # Nullを許容しない場合は、「!(nonNullAssertion)」を付与する。
    hello: String!
    products: [Product!]!
    product(id: ID!): Product
  }
  type Product {
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    image: String!
    onSale: Boolean!
  }
`;

const resolvers = {
  Query: {
    hello: () => {
      return 'World!!';
    },
    products: () => products,
    product: (parent, { id: productId }, context) => {
      console.log('parent', parent);
      console.log('productId', productId);
      console.log('context', context);
      return products.find((product) => product.id === productId) || null;
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
