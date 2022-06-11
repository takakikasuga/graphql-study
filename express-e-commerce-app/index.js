const { ApolloServer } = require('apollo-server');
const { typeDefs } = require('./schema');
const { Category } = require('./resolvers/Category');
const { Mutation } = require('./resolvers/Mutation');
const { Query } = require('./resolvers/Query');
const { Product } = require('./resolvers/Product');
const { categories, products, reviews } = require('./data');

const server = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    Mutation,
    Category,
    Product
  },
  context: {
    categories,
    products,
    reviews
  }
});

server.listen().then(({ url }) => {
  console.log('Server is ready at ', url);
});
