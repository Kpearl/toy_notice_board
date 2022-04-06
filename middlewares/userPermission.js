const jwt = require('../utils/jwt')

async function isLogin (req, res, next) {
  try {
    if (req.headers && req.headers.authorization) {
      const user = await jwt.verify(req.headers.authorization)
      res.locals.user = {
        id: user.id,
        email: user.email,
        rest: user.rest
      }
    } else {
      res.json('로그인이 필요합니다.')
    }
    return next()
  }
  catch (e) {
    console.log('login error : ', e)
    return res.json('다시 로그인하세요.')
  }
}
module.exports = {
  isLogin
}
