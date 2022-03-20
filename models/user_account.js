'use strict';
const {
  Model
} = require('sequelize');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = (sequelize, DataTypes) => {
  class User_account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Details,{
        foreignKey: 'userID'
      })
    }

    static #encrypt = (password) => bcrypt.hashSync(password, 10)

    static encrypt = (password) => bcrypt.hashSync(password, 10)

    static register = ({username, password, email}) => {
      const encryptedPassword = this.#encrypt(password)
      return this.create({username, password: encryptedPassword, email})
    }

    checkPassword = (password) => bcrypt.compareSync(password, this.password)

    // Method untuk authenticate, login
    static authenticate = async({ email, password }) => {
      try {
        const user = await this.findOne({ where: { email }})
        if(!user) return Promise.reject("Email not found!");
        const isPasswordValid = user.checkPassword(password);
        if(!isPasswordValid) return Promise.reject("Wrong password");
        return Promise.resolve(user);
      } catch(err) {
        return Promise.reject(err);
      }
    }

    static verifyToken = async (token) =>{
      try {
        const tokenverify = jwt.verify(token, 'binarch7', (err, result) => {
          // res.status(200).json({err: err, result: result})
          return {err: err, result: result}
        })
        return Promise.resolve(tokenverify)
      } catch (error) {
        return Promise.reject(error)
      }
      
      
    }
    // generate token JWT
    generateToken = () => {
      const payload = {
        id: this.id,
        email: this.email
      }
      // Generate token
      return jwt.sign(payload, 'binarch7')
    }

  };
  User_account.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: DataTypes.STRING,
    description: DataTypes.STRING,
    imageLink: DataTypes.STRING,
    point: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    asAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    sequelize,
    modelName: 'User_account',
  });
  return User_account;
};