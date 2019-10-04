'use strict';
const { Users } = require('../models')
module.exports = {
  up: async (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert('Users', [{
        email: "dorisouellet16@gmail.com",
        username: "doudou",
        password: await Users.hashPassword("Core12Gone12"),
        createdAt: new Date(),
        updatedAt: new Date(),
      }], {})
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {truncate: true, cascade: true, restartIdentity: true});
  }
};
