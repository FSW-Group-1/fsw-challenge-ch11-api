'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Games extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Details, {
        foreignKey:'gameID'
      })
    }
  }
  Games.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    imageLink: DataTypes.STRING,
    gameLink: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Games',
  });
  return Games;
};