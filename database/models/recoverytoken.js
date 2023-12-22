'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RecoveryToken extends Model {
    
    static associate(models) {
      RecoveryToken.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  RecoveryToken.init({
    userId: DataTypes.INTEGER,
    tokenValue: DataTypes.STRING,
    expiryDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'RecoveryToken',
  });
  return RecoveryToken;
};