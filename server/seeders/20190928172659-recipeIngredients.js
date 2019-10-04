'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('RecipeIngredients', [
    {
        ingredientsListId: 1,
        name: "Sauce soya",
        indication: null,
        mesure: "ml",
        quantity: 60,
      },
      {
        ingredientsListId: 1,
        name: "Cassonade",
        indication: "légèrement tassée",
        mesure: "g",
        quantity: 55,
      },
      {
        ingredientsListId: 1,
        name: "Mélasse",
        indication: null,
        mesure: "ml",
        quantity: 45,
      },
      {
        ingredientsListId: 1,
        name: "Vinaigre de riz",
        indication: null,
        mesure: "ml",
        quantity: 30,
      },
      {
        ingredientsListId: 1,
        name: "Échalote française",
        indication: "Émincée",
        mesure: "Unit",
        quantity: 1,
      },
      {
        ingredientsListId: 1,
        name: "Gousses d’ail",
        indication: "Hachées finement",
        mesure: "Unit",
        quantity: 2,
      },
      {
        ingredientsListId: 1,
        name: "Gingembre",
        indication: "frais, râpé",
        mesure: "ml",
        quantity: 5,
      },
      {
        ingredientsListId: 1,
        name: "Sambal oelek",
        indication: null,
        mesure: "ml",
        quantity: 2.5,
      },
      {
        ingredientsListId: 2,
        name: "Filets de porc",
        indication: 'Environ 340g chacun',
        mesure: "g",
        quantity: 700,
      },
      {
        ingredientsListId: 2,
        name: "Huile d'olive",
        indication: null,
        mesure: "ml",
        quantity: 30,
      },
      {
        ingredientsListId: 2,
        name: "Bébés bok choy",
        indication: 'Effeuillés et blanchis',
        mesure: "g",
        quantity: 454,
      },
      {
        ingredientsListId: 2,
        name: "Carottes",
        indication: 'coupées en julienne',
        mesure: "Unit",
        quantity: 3,
      },
      {
        ingredientsListId: 2,
        name: "Pomme verte",
        indication: 'coupées en julienne',
        mesure: "Unit",
        quantity: 1,
      },
      {
        ingredientsListId: 2,
        name: "Oignon vert",
        indication: 'Haché',
        mesure: "Unit",
        quantity: 1,
      },
      {
        ingredientsListId: 2,
        name: "Jus de lime",
        indication: null,
        mesure: "ml",
        quantity: 15,
      },
      {
        ingredientsListId: 2,
        name: "Arachides non salées",
        indication: 'rôtis et hachées',
        mesure: "g",
        quantity: 40,
      },
      {
        ingredientsListId: 2,
        name: "Sel",
        indication: null,
        mesure: null,
        quantity: null,
      },
      {
        ingredientsListId: 2,
        name: "Poivre",
        indication: null,
        mesure: null,
        quantity: null,
      },
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('RecipeIngredients', null, {truncate: true})
  }
}
