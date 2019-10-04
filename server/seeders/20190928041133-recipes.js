'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.bulkInsert('Recipes', [{
      userId: 1,
      title: "Salade de bok choy et de filet de porc, vinaigrette teriyaki",
      preparationTime: 2700000,
      cookingTime: 2100000,
      portions: 6,
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Recipes', null, {truncate: true, cascade: true, restartIdentity: true});
  }
};
