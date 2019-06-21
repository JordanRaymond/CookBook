const Sequelize = require('sequelize')
const UserModel = require('./user')

// Connect to Amazone Aws Postgre
const sequelizeConfig = process.env.ENVIRONEMENT == "dev" ? require('../config/sequelize').dev : require('../config/sequelize').prod

const sequelize = new Sequelize(sequelizeConfig.database, sequelizeConfig.username, sequelizeConfig.password, {
   host: sequelizeConfig.host,
   port: sequelizeConfig.port,
   dialect: sequelizeConfig.dialect,
})

const Users = UserModel(sequelize, Sequelize)

sequelize.sync().then(() => {
  console.log('Database & tables created!')

  sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.')

    // Users.create({
    //   email: 'test@test.com',
    //   username: 'test',
    //   password: '123456'
    // }).then(user => {
    //   // Users.findOne({where: { email: 'test@test.com'}}).then(user => {
    //   //   console.log(user.email)
    //   // })
    // })
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })
})

module.exports = {
  sequelize,
  Users,
}