module.exports.Query = {
  hello: () => 'World!!',
  products: (_parent, { filter }, { db }) => {
    console.log('filter', filter);
    let filteredProducts = db.products;
    if (filter) {
      const { onSale, avgRating } = filter;
      if (onSale === true) {
        filteredProducts = filteredProducts.filter((product) => product.onSale);
      }
      if ([1, 2, 3, 4, 5].includes(avgRating)) {
        filteredProducts = filteredProducts.filter((product) => {
          let sumRating = 0;
          let numberOfReviews = 0;
          db.reviews.forEach((review) => {
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
  product: (_parent, { id: productId }, { db }) => {
    console.log('product');
    return db.products.find((product) => product.id === productId);
  },
  categories: (_parent, _args, { db }) => db.categories,
  category: (_parent, { id: categoryId }, { db }) => {
    console.log('categoryId', categoryId);
    return db.categories.find((category) => category.id === categoryId);
  }
};
