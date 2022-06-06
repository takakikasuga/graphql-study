module.exports.Product = {
  category: (parent, _args, context) => {
    const { categories } = context;
    const categoryId = parent.categoryId;
    return categories.find((category) => category.id === categoryId);
  },
  reviews: (parent, _args, { reviews }) => {
    console.log('parent', parent);
    console.log('reviews', reviews);
    return reviews.filter((review) => review.productId === parent.id);
  }
};
