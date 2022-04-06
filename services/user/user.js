const _ = require('lodash')

const model = require('../models')

class userService {
  async giveUser () {
    const users = await model.users.findAll()
    Promise.all(users.map( async user =>
      await model.users.update({ rest: 15 }, { where: { id: user.id }})
    ))
    return result
  }

  async getUser (id) {
    const filter = { where: { id: id }, attributes: ['id', 'name'] }
    const result = await model.users.findOne(filter)
    return result
  }

  async updateUser (user, total) {
    const result = await model.users.update({ rest: total }, { where: { id: user.id }})
    return result
  }
}

module.exports = new userService()
