const _ = require('lodash')

const jwt = require('../utils/jwt')
const model = require('../models')

class loginService {
  async login (email, password) {
    const filter = { where: { email: email, password: password }}
    const user = await model.users.findOne(filter)
    const result = await jwt.sign(user);
    return result
  }
}

module.exports = new loginService()
