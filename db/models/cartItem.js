const { modelNames: { CART_ITEM } } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define(CART_ITEM, {
    // attributes
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    // options
  });


  return CartItem;
}