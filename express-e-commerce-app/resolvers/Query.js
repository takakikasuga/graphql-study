const { products, categories } = require('../data');

module.exports.Query = {
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
};
