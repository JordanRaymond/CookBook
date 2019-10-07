const express = require('express')
const router = express.Router()

router.use('/recipe', require('./recipe'))

module.exports = router