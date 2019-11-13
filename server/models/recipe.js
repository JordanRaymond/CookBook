module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipes', {
    recipeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,  
      }
    },
    websiteName: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,  
      }
    },
    recipeUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,  
      }
    },
    recipeImgUrl: {
      type: DataTypes.STRING,
      allowNull: true,
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
  })

   // Instance function
   Recipe.prototype.toJson = function() {
    return {
      websiteName: this.websiteName,
      recipeUrl: this.recipeUrl,
      title: this.title,
      recipeInfo: {
        preparationTimeInMs: this.preparationTime,
        cookTimeInMs: this.cookingTime,
        portions: this.portions,
      },
      recipeImgUrl: this.recipeImgUrl,
    }
  }

  return Recipe
}