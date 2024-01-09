'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false
      },
      sku: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        unique: true
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      },
      quantity: {
        type: DataTypes.STRING,
        allowNull: false
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
    await queryInterface.dropTable('products');
  }
};