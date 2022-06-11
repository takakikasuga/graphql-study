const { v4: uuidv4 } = require('uuid');

exports.Mutation = {
  addCategory: (_parent, { input }, { db }) => {
    const { name } = input;
    const newCategory = {
      id: uuidv4(),
      name
    };

    db.categories.push(newCategory);

    return newCategory;
  },
  addProduct: (_parent, { input }, { db }) => {
    const { name, description, quantity, price, image, onSale, categoryId } =
      input;
    const newProduct = {
      id: uuidv4(),
      name,
      description,
      quantity,
      price,
      image,
      onSale,
      categoryId
    };

    db.products.push(newProduct);

    return newProduct;
  },
  addReview: (_parent, { input }, { db }) => {
    const { productId, date, title, comment, rating } = input;
    const newReview = {
      id: uuidv4(),
      productId,
      date,
      title,
      comment,
      rating
    };

    db.reviews.push(newReview);

    return newReview;
  },
  deleteCategory: (_parent, { id }, { db }) => {
    const categoryIndex = db.categories.findIndex(
      (category) => category.id === id
    );

    if (categoryIndex === -1) {
      throw new Error('Category not found');
    }

    db.categories.splice(categoryIndex, 1);

    db.products = db.products.map((product) => {
      if (product.categoryId === id) {
        return {
          ...product,
          categoryId: null
        };
      }
      return product;
    });

    return true;
  },
  deleteProduct: (_parent, { id }, { db }) => {
    const productIndex = db.products.findIndex((product) => product.id === id);

    if (productIndex === -1) {
      throw new Error('Product not found');
    }

    db.products.splice(productIndex, 1);

    db.reviews = db.reviews.filter((review) => review.productId !== id);

    return true;
  },
  deleteReview: (_parent, { id }, { db }) => {
    const reviewIndex = db.reviews.findIndex((review) => review.id === id);

    if (reviewIndex === -1) {
      throw new Error('Review not found');
    }

    db.reviews.splice(reviewIndex, 1);

    return true;
  }
};
