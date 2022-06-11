const { v4: uuidv4 } = require('uuid');

exports.Mutation = {
  addCategory: (_parent, { input }, { categories }) => {
    const { name } = input;
    const newCategory = {
      id: uuidv4(),
      name
    };

    categories.push(newCategory);

    return newCategory;
  },
  addProduct: (_parent, { input }, { products }) => {
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

    products.push(newProduct);

    return newProduct;
  },
  addReview: (_parent, { input }, { reviews }) => {
    const { productId, date, title, comment, rating } = input;
    const newReview = {
      id: uuidv4(),
      productId,
      date,
      title,
      comment,
      rating
    };

    reviews.push(newReview);

    return newReview;
  }
};
