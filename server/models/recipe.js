module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipes', {
    userId: {
      type: DataTypes.INTEGER,
      references: {
          model: 'Users',
          key: '_users_id'
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
    recipeStepsId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'RecipeSteps',
        key: '_recipe_steps_id'
      }
    },
    ingredientListId: {
      type: DataTypes.INTEGER,
      references: {
          model: 'IngredientsList',
          key: '_ingredientsList_id'
      },
      allowNull: false,
    },
  })

  return Recipe
}