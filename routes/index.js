var express = require('express')
var router = express.Router()

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Wanted Lab', description: 'node.js developer Project' });
})

router.use('/bbs', require('./bbs'))
router.use('/notices', require('./notice'))

module.exports = router
