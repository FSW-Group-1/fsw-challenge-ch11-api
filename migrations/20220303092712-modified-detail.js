'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn('Details', 'point', {
        type: Sequelize.INTEGER,
      });
      await queryInterface.removeColumn('Details', 'result');
      return Promise.resolve();
    } catch (error) { 
      return Promise.reject(error);
    }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
     try {
      await queryInterface.removeColumn('Details', 'point');
      await queryInterface.addColumn('Details', 'result', {
        type: Sequelize.STRING,
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
};
