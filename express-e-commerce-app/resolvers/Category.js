module.exports.Category = {
  products: (parent, { filter }, { products }) => {
    const categoryId = parent.id;
    const categoryProducts = products.filter(
      (product) => product.categoryId === categoryId
    );
    let filteredCategoryProducts = categoryProducts;
    if (filter) {
      const { onSale } = filter;
      if (onSale === true) {
        filteredCategoryProducts = filteredCategoryProducts.filter(
          (product) => product.onSale
        );
      }
    }
    return filteredCategoryProducts;
  }
};
