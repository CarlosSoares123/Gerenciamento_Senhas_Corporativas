'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING
      },
      passwordHash: {
        type: Sequelize.STRING
      },
      fullName: {
        type: Sequelize.STRING
      },
      emailAddress: {
        type: Sequelize.STRING
      },
      jobTitle: {
        type: Sequelize.STRING
      },
      accessLevel: {
        type: Sequelize.INTEGER
      },
      isBlocked: {
        type: Sequelize.BOOLEAN
      },
      isActive: {
        type: Sequelize.BOOLEAN
      },
      passwordLastChanged: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};