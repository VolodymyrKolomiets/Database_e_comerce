////////FALTAN LAS VALIDACIONES
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
 
    static associate(models) {
      Product.belongsTo(models.Category)
      Product.belongsToMany(models.Order ,{through:models.OrderProduct})

    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.FLOAT,
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};

