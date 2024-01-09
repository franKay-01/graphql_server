'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('products', [{
      name: 'nike airforce 260',
      description: 'The best sneakers you can find on the market',
      sku: uuidv4(),
      category_id: 1,
      price: 250.00,
      quantity: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Elite Blender',
      description: 'The best Nasco blender you can find on the market. It can be used to prepare you early morning smoothies, and many more',
      sku: uuidv4(),
      category_id: 2,
      price: 150.00,
      quantity: 130,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}); 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('products', null, {}); 
  }
};
