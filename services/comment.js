const _ = require('lodash')

const models = require('../models')

class commentService {
  async getComments (id) {
    const result = await models.comments.findAll({
      where: { boards_id: id, parent_id: null },
      attributes: ['id', 'comment', 'name', 'created_at'],
      include:[{
        model: models.comments,
        as: 'childComment',
        require: false,
        attributes: ['id', 'comment', 'name', 'created_at'],
      }]
    })
    return result
  }

  async insertComment (filter) {
    const result = await models.comments.create(filter)
    return result
  }

  async deleteComment (id) {
    const result = await models.comments.destroy({ where: { boards_id: id }})
    return result
  }
}

module.exports = new commentService()
