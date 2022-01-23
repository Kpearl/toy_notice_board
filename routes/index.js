var express = require('express')
var router = express.Router()

router.use('/bbs', require('./bbs'))
router.use('/notices', require('./notice'))

module.exports = router
