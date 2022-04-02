'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    try {
      await queryInterface.addColumn('Games', 'videoLink', {
        type: Sequelize.STRING,
      });
      await queryInterface.addColumn('Games', 'videoID', {
        type: Sequelize.STRING,
      });
      return Promise.resolve();
    } catch (error) { 
      return Promise.reject(error);
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('Games', 'videoLink')
    await queryInterface.removeColumn('Games', 'videoID')
  }
};
