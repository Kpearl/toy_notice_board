const _ = require('lodash')

const models = require('../models')

class commentService {
  async getComment (id) {
    const result = await models.comments.find({ where: { id: id }})
    return result
  }

  async insertComment (body) {
    const result = await models.comments.create(body)
    return result
  }
}

module.exports = new commentService()
