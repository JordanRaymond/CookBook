'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => { 
    return queryInterface.createTable('Steps', {
      stepId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      description: {
        type: DataTypes.STRING(500),
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      stepsListId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'StepsLists',
          key: 'stepsListId'
        },
        allowNull: false,
      }, 
      createdAt: {
        type: DataTypes.DATE
      },
      updatedAt: {
        type: DataTypes.DATE
      },
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Steps');
  }
};
