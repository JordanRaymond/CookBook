'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
     return queryInterface.bulkInsert('IngredientsLists', [
      {
        title: "Vinaigrette teriyaki",
        recipeId: 1
      },
      {
        title: "Salade",
        recipeId: 1
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('IngredientsLists', null, {truncate: true, cascade: true, restartIdentity: true})
  }
};
