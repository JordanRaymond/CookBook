const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
// const flash = require('connect-flash') TODO: unistall 
const session = require('express-session')
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const app = express()
const config = require('./config/config')
require('dotenv').config()

// Cors definition 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://192.168.2.89:3000') // TODO: setup env variable
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, cookie, set-cookie')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
  res.setHeader('Access-Control-Allow-Credentials', true)

  next()
})

// Passport Config, Db init
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

// ======== DEBUG ============
// app.use((req, res, next) => {
//   console.log('Request Headers: ')
//   console.log(JSON.stringify(req.headers, null, 4))
//   if(req.cookies) {
//     console.log('Request cookies: ')
//     console.log(JSON.stringify(req.cookies, null, 4))
//   }

//   console.log('Res Headers: ')
//   console.log(JSON.stringify(res.getHeaders(), null, 4))
//   console.log(`res.get('set-cookie'): ${res.get('set-cookie')}`)
//   console.log(`res.get('cookie'): ${res.get('cookie')}`)

//   // res.cookie('test', 1234, {path: '/', isSecure: true})
//   // console.log('Res cookies: ')
//   // console.log(res.cookie())

//   next()
// })

// Routes
app.use(require('./routes'))

const PORT = process.env.PORT || 5000
app.listen(PORT, console.log(`Server started on port ${PORT}`))