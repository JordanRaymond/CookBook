const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
// const flash = require('connect-flash') TODO: unistall 
const session = require('express-session')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const app = express()
const config = require('./config/config')
const { sequelize } = require('./models')

require('dotenv').config()

// Cors definition 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', `http://${process.env.IP_ADDRESS}:3000`) // Unifie bot server and client env
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, cookie, set-cookie')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Credentials', true)

  next()
})

sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.')
}).catch(err => {
  console.error('Unable to connect to the database:', err)
})

// Passport Config
require('./config/passport')

// Express body parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(morgan('dev'))
// Express session
app.use(cookieParser())
// TODO: read more about the store
// can access wit req.session
app.use(
  session({
    secret: config.secret,
    resave: false,
    saveUninitialized: true,
  })
) 

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.use((err, req, res, next) => { 
  console.log("++++++++++++++++++++Here")
  next()
 })

// Routes
app.use(require('./routes'))

app.use((err, req, res, next) => { 
  console.log(err)

  next()
})

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server started on port ${PORT}`))