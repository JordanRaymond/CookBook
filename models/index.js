'use strict';
const fs        = require('fs')
const path      = require('path')
const Sequelize = require('sequelize')

// set a reference to this file's name so we can exclude it later
const basename  = path.basename(__filename)

// Connect to Amazone Aws Postgre
const sequelizeConfig = require('../config/sequelize')
const sequelize = new Sequelize(sequelizeConfig.database, sequelizeConfig.username, sequelizeConfig.password, {
   host: sequelizeConfig.host,
   port: sequelizeConfig.port,
   dialect: sequelizeConfig.dialect,
})

// initalize a db object
const db = {}

// This gathers up all the model files we have yet to create, and
// puts them onto our db object, so we can use them in the rest
// of our application
fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js')
  })
  .forEach(file => {
    let model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

// export the main sequelize package with an uppercase 'S' and
// our own sequelize instance with a lowercase 's'
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;