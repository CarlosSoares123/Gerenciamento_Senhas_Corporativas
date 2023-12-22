'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PasswordHistory extends Model {
    static associate(models) {
      PasswordHistory.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  PasswordHistory.init({
    userId: DataTypes.INTEGER,
    passwordHash: DataTypes.STRING,
    changeDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'PasswordHistory',
  });
  return PasswordHistory;
};