module.exports = (sequelize, DataTypes) => {
  const Recipe = sequelize.define('Recipes', {
    recipeId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      unique: true
    },
    // userId: {
    //   type: DataTypes.INTEGER,
    //   references: {
    //       model: 'Users',
    //       key: 'userId'
    //   },
    //   allowNull: false,
    // }, 
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
  })

   // Instacne function
   Recipe.prototype.toJson = function() {
    return {
      title: this.title,
      recipeInfo: {
        preparationTimeInMs: this.preparationTime,
        cookTimeInMs: this.cookingTime,
        portions: this.portions,
      }
    }
  }

  return Recipe
}