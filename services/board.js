const _ = require('lodash')
const { Op } = require("sequelize")

const models = require('../models')

class boardService {
  async searchBoard (keyword, paging) {
    const filter = keyword ? { [Op.or]: [{ title: keyword }, { name: keyword }] } : {}
    const result = models.boards.findAll({
      attributes: [ 'id', 'title', 'contents', 'name', 'created_at', 'updated_at'],
      where: filter,
      limit: paging.size,
      offset: paging.offset
    })
    return result
  }

  async getBoard (id) {
    const result = await models.boards.findOne({ where: { id: id },
      attributes: [ 'id', 'title', 'contents', 'name', 'created_at', 'updated_at']})
    return result
  }

  async insertBoard (body) {
    const result = await models.boards.create(body)
    return result
  }

  async updateBoard(id, filter) {
    const result = await models.boards.update(filter, { where: { id: id }})
    return result
  }

  async deleteBoard (id) {
    const result = await models.boards.destroy({ where: { id: id }})
    return result
  }

   async checkPassword (id, password) {
    const result = await models.boards.findOne({ where: { id: id, password: password }})
    return !!result
  }
}

module.exports = new boardService()
