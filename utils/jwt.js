const jwt = require('jsonwebtoken')
const secretKey = require('../config/secretKey').secretKey
const options = require('../config/secretKey').option

module.exports = {
  sign: async (user) => {
    const payload = {
      id: user.id,
      email: user.email
    }
    const result = {
      token: jwt.sign(payload, secretKey, options),
      user_id: user.id,
      name: user.name
    }
    return result
  },
  verify: async (token) => {
    let decoded
    try {
      decoded = jwt.verify(token, secretKey)
    } catch (err) {
      if (err.message === 'jwt expired') {
        console.log('expired token')
        return TOKEN_EXPIRED
      } else if (err.message === 'invalid token') {
        console.log('invalid token')
        console.log(TOKEN_INVALID)
        return TOKEN_INVALID
      } else {
        console.log("invalid token")
        return TOKEN_INVALID
      }
    }
    return decoded
  }
}
