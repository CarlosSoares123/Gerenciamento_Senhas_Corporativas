'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserActions extends Model {

    static associate(models) {
      UserActions.belongsTo(models.User, { foreignKey: 'userId' })
    }
  }
  UserActions.init(
    {
      userId: DataTypes.INTEGER,
      actionName: DataTypes.STRING,
      details: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'UserActions'
    }
  )
  return UserActions;
};