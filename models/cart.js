const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const db = require('../db');


const getCart = async () => {
  const a = await db.Cart.findAll({
    include: [{
      model: db.Product
    }]
  });
  console.log('getCart??', a)
  return { products: [], totalPirce: 0 };
};

const addProduct = (productId) => db.Cart.create({ productId });

const deleteProduct = async (productId) => {
  const cart = await readFile(CART_PATH);
  delete cart.products[productId];
  return writeFile(CART_PATH, cart);
};


module.exports = {
  getCart,
  addProduct,
  deleteProduct,
}