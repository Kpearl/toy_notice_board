const _ = require('lodash')

const model = require('../models')

class userService {
  async getUser (id) {
    const filter = { where: { id: id }, attributes: ['id', 'name'] }
    const result = await model.users.findOne(filter)
    return result
  }

  async updateUser (user, total) {
    const result = await model.users.update({ where: { id: user.id }})
    return result
  }
}

module.exports = new userService()
