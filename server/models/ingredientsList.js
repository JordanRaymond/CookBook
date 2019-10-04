module.exports = (sequelize, DataTypes) => {
    const IngredientsList = sequelize.define('IngredientsLists', {
      ingredientsListId: {
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
    })

    return IngredientsList
  }