const _ = require('lodash')

const models = require('../models')

class commentService {
  async getComments (id) {
    const result = await models.comments.findAll({
      where: { bbs_id: id, parent_id: null },
      attributes: ['id', 'bbs_id', 'comment', 'name', 'parent_id', 'created_at'],
      include:[{
        model: models.comments,
        as: 'childComment',
        require: false,
        attributes: ['id', 'bbs_id', 'comment', 'name', 'parent_id', 'created_at'],
      }]
    })
    return result
  }

  async insertComment (filter) {
    const result = await models.comments.create(filter)
    return result
  }
}

module.exports = new commentService()
