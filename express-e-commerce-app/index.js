const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./schema');
const { Category } = require('./resolvers/Category');
const { Query } = require('./resolvers/Query');
const { Product } = require('./resolvers/Product');
const { categories, products } = require('./data');

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Category,
    Product
  },
  context: {
    categories,
    products
  }
});

server.listen().then(({ url }) => {
  console.log('Server is ready at ', url);
});
