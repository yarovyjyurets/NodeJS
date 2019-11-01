const { modelNames: { ORDER } } = require('../constants');

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define(ORDER, {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    }
  });


  return Order;
}