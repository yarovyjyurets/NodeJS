const db = require('../db');
const { modelNames } = require('../db/constants');
const { getShopDb } = require('../mongDB');
const { ObjectId } = require('mongodb');

let getById;
let create;
let getCart;
let createCart;

if (process.env.DB === 'SQL') {
  getById = (userId) => db[modelNames.USER].findByPk(userId);
  create = (newUserData) => db[modelNames.USER].create(newUserData);
  getCart = (user) => user.getCart();
  createCart = (user) => user.createCart();
} else {
  getById = (userId) => {
    const shopDB = getShopDb();
    return shopDB.collection('user').findOne({ _id: new ObjectId(userId) });
  }
  create = (newUserData) => {
    const shopDB = getShopDb();
    return shopDB.collection('user').insertOne(newUserData);
  }
  getCart = (user) => user.cart;
  createCart = async (user) => {
    const shopDB = getShopDb();
    const newUserData = { $set: { cart: { products: [] } } };
    await shopDB.collection('user').updateOne({ _id: user._id }, newUserData);
    const { cart } = await shopDB.collection('user').findOne({ _id: user._id })
    return cart;
  }
}

module.exports = {
  getById,
  create,
  createCart,
  getCart,
};