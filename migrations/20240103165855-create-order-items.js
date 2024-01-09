'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('order_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      order_item_reference_no: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      order_id: {
        type: DataTypes.INTEGER, 
        allowNull: false
      },
      product_id: {
        type: DataTypes.INTEGER, 
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      unit_amount:{
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
      },
      desc: {
        type: DataTypes.STRING,
        allowNull: true,
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
    await queryInterface.dropTable('order_items');
  }
};