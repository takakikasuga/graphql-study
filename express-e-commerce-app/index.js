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
    category: Category
  }
  type Category {
    id: ID!
    name: String!
    products: [Product!]!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'World!!',
    products: () => products,
    product: (_parent, { id: productId }, _context) => {
      console.log('_parent', _parent);
      console.log('productId', productId);
      console.log('_context', _context);
      return products.find((product) => product.id === productId);
    },
    categories: () => categories,
    category: (_parent, { id: categoryId }, _context) => {
      console.log('categoryId', categoryId);
      console.log(categories.find((category) => category.id === categoryId));
      return categories.find((category) => category.id === categoryId);
    }
  },
  Category: {
    products: (parent, _args, _context) => {
      console.log('parent', parent);
      console.log('_args', _args);
      const categoryId = parent.id;
      return products.filter((product) => product.categoryId === categoryId);
    }
  },
  Product: {
    category: (parent, _args, _context) => {
      console.log('parent', parent);
      console.log('_args', _args);
      const categoryId = parent.categoryId;
      return categories.find((category) => category.id === categoryId);
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
