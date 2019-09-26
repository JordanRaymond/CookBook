module.exports = (sequelize, DataTypes) => {
    const IngredientsList = sequelize.define('IngredientsList', {
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
            key: '_recipes_id'
        },
        allowNull: false,
      }, 
    })

    return IngredientsList
  }