const express = require('express')
const router = express.Router()
const passport = require('passport')
const { Users: User, Recipes, StepsLists, IngredientsLists, Steps, RecipeIngredients } = require('../../models')
const asyncMiddleware = require('../../utils/asyncMiddleware') 
const asyncForEach = require('../../utils/asyncForEach') 
const areUserInputsValid = require('../../utils/validation/userValidation')

router.get('/isAuth', (req, res) => {
  if(req.isAuthenticated()) {
      res.status(200).json({
        isAuth: true, 
        message: 'User is authenticated.',
        username: req.user.username
    })
  } else {
      res.status(401).json({
        isAuth: false,
        message: 'User not authenticated'
    }) 
  }
}) 

// A bug with pasport and post logout
router.post('/logout', (req, res) => {
 
  req.logout()
  req.session.destroy((err) => {
    if(err) return next(err)
  
    res.status(200).json({
      success: true,
      message: 'Logout succeful'
    })
  })
})

router.get('/logout', (req, res) => {
 
  req.logout()
  req.session.destroy((err) => {
    if(err) return next(err)
  
    res.status(200).json({
      success: true,
      message: 'Logout succeful'
    })
  })
})

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
  req.login(user, (err) => {
    if(err) return next(err)

    return res.status(200).json({ 
      username : `${user.username}`,
    })
  })
 
}))

router.post('/login', (req, res, next) => {
  passport.authenticate('local', function(err, user, info) {
    if (err) {
      return next(err); // will generate a 500 error
    }

    // Generate a JSON response reflecting authentication status
    if (! user) {
      return res.status(401).json({ 
        message : 'Invalide email or passwword' 
      })
    }
 
    req.login(user, async loginErr => {
      if (loginErr) {
        return next(loginErr)
      }
      
      // let recipes = await getUserRecipes(user)

      return res.status(200).json({ 
        message : 'Authentication succeeded',
        username: user.username,
      })
    })
  })(req, res, next)
})

async function isUserCredentialValid(email, username, password, passwordConf) {
  return areUserInputsValid(email, username, password, passwordConf)
      && !await areCredentialAlredyUsed(email, username)
}

async function areCredentialAlredyUsed(email, username) {
  return await User.findOne({ where: {email: email } }) != null
      || await User.findOne({ where: {username: username } }) != null
}

async function createNewUser(email, username, password) {
  
  const newUser = User.build({
    email: email.trim(),
    username: username.trim(),
    password: password.trim()
  })

  const hash = await User.hashPassword(password)
  newUser.password = hash
  
  return await newUser.save()
}



module.exports = router