'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   await queryInterface.bulkInsert('Games', [
     {
       name: 'Rock Paper Scissor',
       description: 'Permainan Gunting Batu Kertas',
       gameLink: '/rps',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       name: 'Ludo',
       description: 'Permainan Ludo',
       gameLink: '/ludo',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       name: 'Snake and Ladder',
       description: "Permainan ular dan tangga",
       gameLink: '/snk',
       createdAt: new Date(),
       updatedAt: new Date()
     },
     {
       name: 'Congklak',
       description: 'Permainan congklak',
       gameLink: '/congklak',
       createdAt: new Date(),
       updatedAt: new Date()
     }
   ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Games', null, {})
  }
};
