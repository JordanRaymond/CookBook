  'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    return queryInterface.createTable('Recipes', {
      recipeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'userId'
        },
        allowNull: false,
      }, 
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,  
        }
      },
      preparationTime: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cookingTime: {
          type: DataTypes.INTEGER,
          allowNull: true,
      },
      portions: {
          type: DataTypes.INTEGER,
          allowNull: true,
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
    return queryInterface.dropTable('Recipes');
  }
};