'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert ( 'Users', [

      {
      name: 'John',
      surname: 'Kajovsky',
      email: 'example1@example.com',
      password:'123456',
      role:'user',
      createdAt: new Date(),
      updatedAt: new Date(),
      confirmed: true
      },
      {
      name: 'Maria',
      surname: 'Jimenez',
      email: 'example2@example.com',
      password:'123456',
      role:'user',
      createdAt: new Date(),
      updatedAt: new Date(),
      confirmed: true
      },
      {
      name: 'Juan',
      surname: 'Martinez',
      email: 'example3@example.com',
      password:'123456',
      role:'user',
      createdAt: new Date(),
      updatedAt: new Date(),
      confirmed: true
      }
      ])
  },
    // sequelize db:seed:all

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
