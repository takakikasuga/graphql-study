module.exports.Category = {
  products: (parent, _args, context) => {
    const { products } = context;
    const categoryId = parent.id;
    return products.filter((product) => product.categoryId === categoryId);
  }
};
