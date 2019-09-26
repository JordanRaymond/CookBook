module.exports = (sequelize, DataTypes) => {
  const RecipeIngredients = sequelize.define('RecipeIngredients', {
    // ingredientId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //       model: 'Ingredients',
    //       key: 'ingredients_id'
    //   },
    //   allowNull: true,
    // },
    ingredientListId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'IngredientsList',
            key: '_ingredients_list_id'
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
    unit: {
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
  })

  return RecipeIngredients
}