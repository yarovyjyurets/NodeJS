const { modelNames: { ORDER_ITEM } } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define(ORDER_ITEM, {
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
  });


  return OrderItem;
}