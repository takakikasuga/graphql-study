module.exports.Query = {
  hello: () => 'World!!',
  products: (parent, { filter }, { products }) => {
    console.log('filter', filter);
    let filteredProducts = products;
    if (filter) {
      if (filter.onSale === true) {
        filteredProducts = filteredProducts.filter((product) => product.onSale);
      }
    }
    return filteredProducts;
  },
  product: (_parent, { id: productId }, context) => {
    const { products } = context;
    return products.find((product) => product.id === productId);
  },
  categories: () => categories,
  category: (_parent, { id: categoryId }, context) => {
    console.log('categoryId', categoryId);
    const { categories } = context;
    console.log(categories.find((category) => category.id === categoryId));
    return categories.find((category) => category.id === categoryId);
  }
};
