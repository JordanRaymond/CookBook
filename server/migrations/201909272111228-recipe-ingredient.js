'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
   return queryInterface.createTable('RecipeIngredients', {
    recipeIngredientId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    ingredientsListId: {
      type: DataTypes.INTEGER,
      references: {
          model: 'IngredientsLists',
          key: 'ingredientsListId'
      },
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true
      },
    },
    indication: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true
      },
    },
    mesure: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        }
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
          notEmpty: true,
      }
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
    return queryInterface.dropTable('RecipeIngredients');
  }
};
