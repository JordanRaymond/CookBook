module.exports = (sequelize, DataTypes) => {
  const RecipeIngredients = sequelize.define('RecipeIngredients', {
    recipeIngredientId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
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
  })

     // Instacne function
     RecipeIngredients.prototype.toJson = function() {
      return {
        name: this.name,
        indication: this.indication,
        mesure: this.mesure,
        quantity: this.quantity
      }
    }

  return RecipeIngredients
}