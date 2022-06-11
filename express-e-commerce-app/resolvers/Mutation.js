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
  }
};
