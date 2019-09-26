const express = require('express')
const router = express.Router()
const passport = require('passport')
const { Users: User } = require('../../models/sequelize')
const asyncMiddleware = require('../../utils/asyncMiddleware') 
const areUserInputsValid = require('../../models/User/userValidation')
// const jwt = require('jsonwebtoken') 

router.post('/register', asyncMiddleware( async(req, res, next) => {
  const errMsg = `Validation of the Register form inputs failed.`
  const { email, username, password, passwordConf } = req.body
  
  const isUserDataValid = await isUserCredentialValid(email, username, password, passwordConf)
  if (!isUserDataValid) {
    return res.status(400).json({ 
      message : errMsg,
    })
  }

  const user = await createNewUser(email, username, password)
  return res.status(200).json({ 
    message : `${user.email}`,
  })
}))

async function isUserCredentialValid(email, username, password, passwordConf) {
  return areUserInputsValid(email, username, password, passwordConf)
      && !await areCredentialAlredyUsed(email, username)
}

async function areCredentialAlredyUsed(email, username) {
  return await User.findOne({ where: {email: email } }) != null
      || await User.findOne({ where: {username: username } }) != null
}

async function createNewUser(email, username, password) {
  const newUser = new User({
    email,
    username,
    password
  })

  const hash = await newUser.hashPassword(password)
  newUser.password = hash
  
  return await newUser.save()
}

router.post('/login', (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }

    // Generate a JSON response reflecting authentication status
    if (! user) {
      return res.status(401).json({ 
        success : false, 
        message : 'Invalide email or passwword' 
      })
    }
 
    req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr)
      }

      return res.status(200).json({ 
        success : true, 
        message : 'Authentication succeeded',
        username: user.username
      })
    })
  })(req, res, next)
})

router.get('/isAuth', (req, res) => {
  if(req.isAuthenticated()) {
      res.status(200).json({
        isAuth: true, 
        message: 'User is authenticated.'
    })
  } else {
      res.status(401).json({
        isAuth: false,
        message: 'User not authenticated'
    })
  }
}) 

router.get('/logout', (req, res) => {
  req.logout()
  res.status(200).json({
    success: true,
    message: 'Logout succeful'
  })
})

module.exports = router