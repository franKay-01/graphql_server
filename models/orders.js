'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    static associate({Users, OrderItems}) {
      this.belongsTo(Users, {foreignKey: 'user_id', as: 'users'})
      this.hasMany(OrderItems, {foreignKey: 'order_id' , as: 'orderItems'})
    }
  }
  
  Orders.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {msg: "User reference is a required field"},
        notEmpty: {msg: "User reference is a required field"}
      }
    },
    order_custom_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    amount:{
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00
    },
    other_info:{
      type: DataTypes.JSON,
      allowNull: true
    },
    status: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    sequelize,
    tableName: 'orders',
    modelName: 'Orders',
  });
  return Orders;
};