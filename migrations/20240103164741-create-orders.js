'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('orders');
  }
};