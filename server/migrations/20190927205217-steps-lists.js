'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('StepsLists', {
      stepsListId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      title: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        }
      },
      recipeId: {
          type: DataTypes.INTEGER,
          references: {
              model: 'Recipes',
              key: 'recipeId'
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
    return queryInterface.dropTable('StepsLists');
  }
};
