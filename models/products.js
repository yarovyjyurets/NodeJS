const db = require('../db');
const { getShopDb } = require('../mongDB');
const { ObjectId } = require('mongodb');

let getAll;
let addProduct;
let getProductById;
let updateProductById;
let removeProductById;
let getAllByUser;

if (process.env.DB === 'SQL') {
  getAll = () => db.Product.findAll();
  addProduct = (product) => db.Product.create(product);
  getProductById = (id) => db.Product.findByPk(id);
  updateProductById = (id, product) => db.Product.update(product, { where: { id } });
  removeProductById = (id) => db.Product.destroy({ where: { id } });
  getAllByUser = () => [];
} else {
  getAll = async () => {
    const shopDB = getShopDb();
    return shopDB.collection('products').find({}).toArray();
  }
  getAllByUser = async (user) => {
    const shopDB = getShopDb();
    return shopDB.collection('products').find({ userId: user._id.toString() }).toArray();
  }
  addProduct = async (product, user) => {
    const shopDB = getShopDb();
    return shopDB.collection('products').insertOne({ userId: user._id.toString(), ...product });
  }
  getProductById = (id) => {
    const shopDB = getShopDb();
    return shopDB.collection('products').findOne({ _id: new ObjectId(id) });
  }
  updateProductById = (id, product) => {
    const shopDB = getShopDb();
    return shopDB.collection('products').updateOne({ _id: new ObjectId(id) }, { $set: product });
  };
  removeProductById = (id) => {
    const shopDB = getShopDb();
    return shopDB.collection('products').deleteOne({ _id: new ObjectId(id) });
  };
}

module.exports = {
  getAll,
  getAllByUser,
  addProduct,
  getProductById,
  updateProductById,
  removeProductById,
}