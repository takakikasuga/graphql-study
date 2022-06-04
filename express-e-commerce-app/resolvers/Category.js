const { products } = require('../data');

module.exports.Category = {
  products: (parent, _args, _context) => {
    console.log('parent', parent);
    console.log('_args', _args);
    const categoryId = parent.id;
    return products.filter((product) => product.categoryId === categoryId);
  }
};
