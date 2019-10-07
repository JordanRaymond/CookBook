'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Recipes', [{
      userId: 1,
      websiteName: "Ricardo",
      recipeUrl: "https://www.ricardocuisine.com/recettes/6984-salade-de-bok-choy-et-de-filet-de-porc-vinaigrette-teriyaki",
      title: "Salade de bok choy et de filet de porc, vinaigrette teriyaki",
      preparationTime: 2700000,
      cookingTime: 2100000,
      portions: 6,
      recipeImgUrl: "https://images.ricardocuisine.com/services/recipes/500x675_181196112556681c615e664.jpg"
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Recipes', null, {truncate: true, cascade: true, restartIdentity: true});
  }
};
