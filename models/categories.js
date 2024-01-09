'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    static associate({Products}) {
      this.hasMany(Products, {foreignKey: 'category_id', as: 'products' })
    }
  }
  
  Categories.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notNull: {msg: "Category name is a required field"},
        notEmpty: {msg: "Category name is a required field"}
      }
    },
    reference_no: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
    },
  }, {
    sequelize,
    tableName: 'categories',
    modelName: 'Categories',
  });
  return Categories;
};