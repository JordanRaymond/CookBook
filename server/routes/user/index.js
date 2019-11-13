const express = require('express')
const router = express.Router()

router.use('/user', require('./user'))
router.use('/user/recipes', require('./recipes/recipes'))

module.exports = router