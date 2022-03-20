'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User_account, {
        foreignKey: 'userID'
      })

      this.belongsTo(models.Games, {
        foreignKey: 'gameID'
      })
    }
  }
  Details.init({
    userID: DataTypes.INTEGER,
    gameID: DataTypes.INTEGER,
    point: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Details',
  });
  return Details;
};