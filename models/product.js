'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {

    static associate(models) {
      Product.belongsTo(models.Category)
      Product.belongsToMany(models.Order, { through: models.OrderProduct })

    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor introduce el nombre del producto",
        },
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Por favor introduce el nombre del producto",
        },
      },
    },
    // description: {
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   validate: {
    //     notNull: {
    //       msg: "Por favor escriba una breve descripcion del producto",
    //     },
    //   },
    // },
    images: {
      type: DataTypes.STRING
    },
    CategoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};

