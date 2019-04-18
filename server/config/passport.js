
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const { Users } = require('../models/sequelize')

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
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  Users.findOne({ where:{ id } }).then(user => {
    done(null, user)
  })
  .catch(done)
})