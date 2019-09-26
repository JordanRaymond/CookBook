module.exports = (sequelize, DataTypes) => {
    const Ingredient = sequelize.define('Ingredients', {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,  
        }
      },
      info: {
          type: DataTypes.STRING,
          allowNull: true,
      }  
    })

    return Ingredient
  }