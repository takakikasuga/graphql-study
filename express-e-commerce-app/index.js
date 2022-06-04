const { ApolloServer, gql } = require('apollo-server');
const { products, categories } = require('./data');

const typeDefs = gql`
  type Query {
    # スカラー定義の場合タイプからNullを定義することになる。
    # Nullを許容しない場合は、「!(nonNullAssertion)」を付与する。
    hello: String!
    products: [Product!]!
    product(id: ID!): Product
    categories: [Category!]!
    category(id: ID!): Category
  }
  type Product {
    id: ID!
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    image: String!
    onSale: Boolean!
  }
  type Category {
    id: ID!
    name: String!
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
      return products.find((product) => product.id === productId);
    },
    categories: () => categories,
    category: (_parent, { id: categoryId }, _context) =>
      categories.find((category) => category.id === categoryId)
  }
};

const server = new ApolloServer({
  typeDefs,
  resolvers
});

server.listen().then(({ url }) => {
  console.log('Server is ready at ', url);
});
