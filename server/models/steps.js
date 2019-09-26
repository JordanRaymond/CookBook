module.exports = (sequelize, DataTypes) => {
    const Steps = sequelize.define('Steps', {
      description: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        }
      },
      recipeStepId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'RecipesSteps',
            key: '_recipes_steps_id'
        },
        allowNull: false,
      }, 
    })

    return Steps
  }