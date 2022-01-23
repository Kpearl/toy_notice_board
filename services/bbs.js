const _ = require('lodash')

const models = require('../models')

class bbsService {
  async getBbs (id) {
    const result = await models.bbs.findOne({ where: { id: id }})
    return result
  }

  async insertBbs (body) {
    const result = await models.bbs.create(body)
    return result
  }

  async updateBbs (id, filter) {
    const result = await models.bbs.update(filter, { where: { id: id }})
    return result
  }

  async deleteBbs (id) {
    const result = await models.bbs.destroy({ where: { id: id }})
    return result
  }
}

module.exports = new bbsService()
