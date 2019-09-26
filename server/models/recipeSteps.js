module.exports = (sequelize, DataTypes) => {
    const RecipeSteps = sequelize.define('RecipeSteps', {
      title: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,
        }
      },
    })

    return RecipeSteps
  }