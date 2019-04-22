const express = require('express')
const router = express.Router()
const passport = require('passport')
// const jwt = require('jsonwebtoken') 


router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = []

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' })
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' })
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' })
  }

  if (errors.length > 0) {
    
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
        message : 'Invalide email or paswword' 
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