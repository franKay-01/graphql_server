'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categories', [{
      name: 'sneakers',
      createdAt: new Date(),
      updatedAt: new Date()
    }, 
    {
      name: 'electricals',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {}); 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categories', null, {}); 
  }
};
