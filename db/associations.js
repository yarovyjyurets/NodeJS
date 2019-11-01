const {
  modelNames: {
    CART,
    PRODUCT,
    USER,
    CART_ITEM,
    ORDER,
    ORDER_ITEM,
  }
} = require('./constants');

module.exports = {
  associateModels: (db) => {
    db[USER].hasOne(db[CART]);
    db[CART].belongsTo(db[USER]);
    db[CART].belongsToMany(db[PRODUCT], { through: db[CART_ITEM] });
    db[PRODUCT].belongsToMany(db[CART], { through: db[CART_ITEM] });

    db[USER].hasMany(db[ORDER]);
    db[ORDER].belongsTo(db[USER], { through: db[ORDER] });
    db[ORDER].belongsToMany(db[PRODUCT], { through: db[ORDER_ITEM] });
  }
};