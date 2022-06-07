module.exports.Query = {
  hello: () => 'World!!',
  products: (_parent, { filter }, { products, reviews }) => {
    console.log('filter', filter);
    let filteredProducts = products;
    if (filter) {
      const { onSale, avgRating } = filter;
      if (onSale === true) {
        filteredProducts = filteredProducts.filter((product) => product.onSale);
      }
      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          let sumRating = 0;
          let numberOfReviews = 0;
          reviews.forEach((review) => {
            if (review.productId === product.id) {
              sumRating += review.rating;
              numberOfReviews++;
            }
          });
          const avgProductRating = sumRating / numberOfReviews;

          return avgProductRating >= avgRating;
        });
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
