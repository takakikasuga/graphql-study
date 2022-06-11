module.exports.Product = {
  category: (parent, _args, { db }) => {
    const categoryId = parent.categoryId;
    return db.categories.find((category) => category.id === categoryId);
  },
  reviews: (parent, _args, { db }) => {
    console.log('parent', parent);
    return db.reviews.filter((review) => review.productId === parent.id);
  }
};
