const express = require('express')
const router = express.Router()
const passport = require('passport')
// const jwt = require('jsonwebtoken') 


router.post('/register', (req, res) => {
  const { email, username, password } = req.body
  let errors = []

  if (!email || !username || !password ) {
    errors.push({ message: 'Please enter all fields' })
  } else {
    
    // Email
    const emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    if(!emailReg.test(String(email))) {
      errors.push({ message: 'Invalid email format' })  
    }

    // Password
    if (password.length < 6) {
      errors.push({ message: 'Password must have least 6 characters' })
    }
  
    const passwordReg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])\S[0-9a-zA-Z]*$/
    if(!passwordReg.test(String(password))) {
      errors.push({ message: 'Invalid password format, must have one uppercase letter and one number' })  
    }

    // Username
    if (username.length < 6) {
      errors.push({ message: 'Username must have at least 6 characters' })
    }

    const isAlphaNumReg = /^\S[a-zA-Z0-9]*$/
    if(!isAlphaNumReg.test(String(username))) {
      errors.push({ message: 'Invalid username format, only alphanumeric characters' })
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({ 
      success : false, 
      message : `Validation of the Register form inputs failed with ${errors.length} error(s)` ,
      errors 
    })
  } else {
    console.log('Validated')
    // User.findOne({ email: email }).then(user => {
    //   if (user) {
    //     errors.push({ msg: 'Email already exists' });
    //     res.render('register', {
    //       errors,
    //       name,
    //       email,
    //       password,
    //       password2
    //     });
    //   } else {
    //     const newUser = new User({
    //       name,
    //       email,
    //       password
    //     });

    //     bcrypt.genSalt(10, (err, salt) => {
    //       bcrypt.hash(newUser.password, salt, (err, hash) => {
    //         if (err) throw err;
    //         newUser.password = hash;
    //         newUser
    //           .save()
    //           .then(user => {
    //             req.flash(
    //               'success_msg',
    //               'You are now registered and can log in'
    //             );
    //             res.redirect('/users/login');
    //           })
    //           .catch(err => console.log(err));
    //       });
    //     });
    //   }
    // });
  }
})

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