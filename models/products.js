'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    static associate({Categories, OrderItems}) {
      this.belongsTo(Categories, { foreignKey: 'category_id', as: 'categories' });
      this.hasMany(OrderItems, {foreignKey: 'product_id' , as: 'products'})
    }
  }

  Products.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Product name is a required field"},
        notEmpty: {msg: "Product name is a required field"}
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Product description is a required field"},
        notEmpty: {msg: "Product description is a required field"}
      }
    },
    sku: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        notNull: {msg: "Product price is a required field"},
        notEmpty: {msg: "Product price is a required field"}
      }
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {msg: "Product quantity is a required field"},
        notEmpty: {msg: "Product quantity is a required field"}
      }
    },
    img_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true
    },
  }, {
    sequelize,
    tableName: 'products',
    modelName: 'Products',
  });
  return Products;
};