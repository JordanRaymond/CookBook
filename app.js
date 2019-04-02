const express = require('express')
const Sequelize = require('sequelize')
const passport = require('passport')
const flash = require('connect-flash')
const session = require('express-session')
// https://medium.com/front-end-weekly/learn-using-jwt-with-passport-authentication-9761539c4314
const app = express()

// Cors definition 
app.use( (req, res, next) => {
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Credentials', true)

  next()
})

// Passport Config
// require('./config/passport')(passport)

// Express body parser
app.use(express.urlencoded({ extended: true }))

// Express session
// app.use(
//   session({
//     secret: 'secret',
//     resave: true,
//     saveUninitialized: true
//   })
// ) 

// Passport middleware
// app.use(passport.initialize())
// app.use(passport.session())

// Connect flash
// app.use(flash())

// Global variables
// app.use((req, res, next) => {
//   res.locals.success_msg = req.flash('success_msg')
//   res.locals.error_msg = req.flash('error_msg')
//   res.locals.error = req.flash('error')

//   next()
// })

// Routes
app.use(require('./routes/users.js'))

const db = require('./models/index')

const PORT = process.env.PORT || 5000
db.sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, console.log(`Server started on port ${PORT}`))

  // const { User } = require('./models')

  // User.create({
  //   email: 'aTestEmail@gmail.com',
  //   username: 'JonhTest',
  //   password: '123456'
  // }).then(user => {
  //   console.log(user)
  // })
})

