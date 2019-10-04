
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const { Users } = require('../models')

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password',
  }, 
  (email, password, done) => {
    Users.findOne({ where:{ email } })
    .then(async (user) => {
      if(user) {
        const result = await user.validatePassword(password)
        if(result) return done(null, user)
      } 

      return done(null, false)    
    }).catch(done)
}))

passport.serializeUser((user, done) => {
  done(null, user.userId)
})

passport.deserializeUser((userId, done) => {
  Users.findOne({ where:{ userId } }).then(user => {
    done(null, user)
  })
  .catch(done)
})