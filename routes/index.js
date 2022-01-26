var express = require('express')
var router = express.Router()

router.use('/boards', require('./board'))
router.use('/comments', require('./comment'))

module.exports = router
