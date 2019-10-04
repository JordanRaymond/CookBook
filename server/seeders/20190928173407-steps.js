'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Steps', [
      {
        stepsListId: 1,
        description: "Dans une petite casserole, mélanger tous les ingrédients. Porter à ébullition. Laisser mijoter à feu moyen environ 10 minutes ou jusqu’à ce que la sauce soit légèrement sirupeuse. Laisser tiédir et réfrigérer jusqu’au moment de servir.",
      },
      {
        stepsListId: 2,
        description: "Placer la grille au centre du four. Préchauffer le four à200 °C (400 °F).",
      },
      {
        stepsListId: 2,
        description: "Dans une poêle allant au four à feu moyen-élevé, dorer les filets de porc dans l’huile. Saler et poivrer. Cuire au four environ 15 minutes ou jusqu’à ce qu’un thermomètre inséré au centre de la viande indique 63 °C (145 °F). Laisser tiédir. Trancher finement.",
      },
      {
        stepsListId: 2,
        description: "Au moment de servir, mélanger les feuilles de bok choy, les carottes, la pomme et l’oignon vert avec la moitié de la sauce teriyaki et le jus de lime. Rectifier l’assaisonnement. Répartir les légumes et le filet de porc dans les assiettes. Napper du reste de la vinaigrette et parsemer d’arachides.",
      },
    ], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Steps', null, {truncate: true})
  }
};
