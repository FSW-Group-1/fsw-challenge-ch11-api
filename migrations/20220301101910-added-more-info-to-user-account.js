'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      await queryInterface.addColumn('User_accounts', 'description', {
        type: Sequelize.STRING,
      });
      await queryInterface.addColumn('User_accounts', 'imageLink', {
        type: Sequelize.STRING,
      });
      await queryInterface.addColumn('User_accounts', 'point', {
        type: Sequelize.INTEGER,
        defaultValue: 0
      });
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
    
  },

  async down (queryInterface, Sequelize) {
    try {
      await queryInterface.removeColumn('User_accounts', 'description');
      await queryInterface.removeColumn('User_accounts', 'imageLink');
      await queryInterface.removeColumn('User_accounts', 'point');
      return Promise.resolve();
    } catch (error) {
      return Promise.reject(error);
    }
  }
};
