var express = require('express')
var router = express.Router()

router.use('/boards', require('./board'))
router.use('/comments', require('./comment'))
router.use('/notices', require('./notice'))

module.exports = router
