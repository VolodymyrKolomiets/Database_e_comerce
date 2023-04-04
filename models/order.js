'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
  
    static associate(models) {
      Order.belongsToMany(models.User,{through:models.OrderProduct})
    }
  }
  Order.init({
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};