'use strict';

var faker = require('faker')
const { User_account } = require('../models')

const users = [
  {
    username: 'admin',
    password: User_account.encrypt('admin'),
    email: 'admin@mail.com',
    asAdmin: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const user1 = [...Array(99)].map(user => (
  {
    username: faker.internet.userName(),
    password: User_account.encrypt(faker.internet.password()),
    email: faker.internet.email(),
    asAdmin: false,
    createdAt: new Date(),
    updatedAt: new Date(),
    description: faker.lorem.sentence(),
    imageLink: 'https://dummyimage.com/600x400/000/fff&text=Account',
    point: 0
  }
))

users.push(...user1)

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
     await queryInterface.bulkInsert('User_accounts', users, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('User_accounts', null, {})
  }
};
