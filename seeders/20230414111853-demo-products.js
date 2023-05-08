'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Products', [{
      name: 'Harry Potter',
      price: 12.99,
      category: 1,
      description: 'Es un libro maravilloso'
    },
    {
      name: 'Harry Potter2',
      price: 13.99,
      category: 1,
      description: 'Es un libro maravilloso'
    },
    {
      name: 'Lord of the ring',
      price: 11.99,
      category: 1,
      description: 'Es un libro maravilloso'
    },
    {
      name: 'Babylon',
      price: 10.99,
      category: 2,
      description: 'Es un libro maravilloso'
    },
    {
      name: 'Ace Ventura',
      price: 9.99,
      category: 3,
      description: 'Es un libro maravilloso'
    },
    ])
  },
    //sequelize db:seed:all

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
