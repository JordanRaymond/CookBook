'use strict';

module.exports = {
  up: (queryInterface, DataTypes) => {
    let migrations = []
    
     migrations.push(queryInterface.addColumn(
      'Recipes', 
      'websiteName', {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,  
        }
      }))

      migrations.push(queryInterface.addColumn(
        'Recipes',
        'recipeUrl', {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,  
        }
      }))

      migrations.push(queryInterface.addColumn(
        'Recipes',
        'recipeImgUrl', {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          notEmpty: true,  
        }
      }))
    
    return Promise.all(migrations)
  },

  down: (queryInterface, DataTypes) => {
    let migrations = []
    
    migrations.push(queryInterface.removeColumn('Recipes', 'websiteName'))
    migrations.push(queryInterface.removeColumn('Recipes','recipeUrl'))
    migrations.push(queryInterface.removeColumn('Recipes','recipeImgUrl'))
    
    return Promise.all(migrations)
  }
}