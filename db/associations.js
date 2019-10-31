const {
  modelNames: {
    CART,
    PRODUCT,
    USER,
    CART_ITEM
  }
} = require('./constants');

module.exports = {
  associateModels: (db) => {
    db[USER].hasOne(db[CART]);
    db[CART].belongsTo(db[USER]);
    db[CART].belongsToMany(db[PRODUCT], { through: db[CART_ITEM] });
    db[PRODUCT].belongsToMany(db[CART], { through: db[CART_ITEM] });
  }
};