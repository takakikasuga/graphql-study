const { categories } = require('../data');

module.exports.Product = {
  category: (parent, _args, _context) => {
    console.log('parent', parent);
    console.log('_args', _args);
    const categoryId = parent.categoryId;
    return categories.find((category) => category.id === categoryId);
  }
};
