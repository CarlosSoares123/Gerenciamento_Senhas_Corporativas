'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SecurityQuestions extends Model {
    static associate(models) {
      SecurityQuestions.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  SecurityQuestions.init({
    userId: DataTypes.INTEGER,
    securityQuestion: DataTypes.STRING,
    securityAnswerHash: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SecurityQuestions',
  });
  return SecurityQuestions;
};