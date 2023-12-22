'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // Associações com outros modelos
      User.hasMany(models.UserActions, {
        foreignKey: 'userId'
      })
      User.hasMany(models.SecurityQuestions, {
        foreignKey: 'userId'
      })
      User.hasMany(models.RecoveryToken, {
        foreignKey: 'userId'
      })
      User.hasMany(models.PasswordHistory, {
        foreignKey: 'userId'
      })
    }
  }

  // Definição dos atributos do modelo
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false, // Não permite valores nulos
        unique: true // Deve ser único
      },
      passwordHash: {
        type: DataTypes.STRING,
        allowNull: false
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false
      },
      emailAddress: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      jobTitle: {
        type: DataTypes.STRING
      },
      accessLevel: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      isBlocked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false 
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      passwordLastChanged: {
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: 'User'
    }
  )

  return User
}
