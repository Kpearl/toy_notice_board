var express = require('express')
var router = express.Router()

const Joi = require('Joi')
const validator = require('express-joi-validation').createValidator({})

const commentService = require('../services/comment')
const noticeService = require('../services/notice')

const schema = Joi.object({
  boards_id: Joi.number(),
  name: Joi.string(),
  comment: Joi.string(),
  parent_id: Joi.number()
})

class Comment {
  constructor () {
    router.get('/:boardId', this.getComments)
    router.post('/:boardId', validator.body(schema), this.insertComment)
  }

  async getComments (req, res) {
    try {
      const boardId = req.params.boardId
      if (boardId) {
        const result = await commentService.getComments(boardId)
        return res.json(result)
      }
      return res.json('입력 내용을 확인하세요.')
    } catch (e) {
      return res.json(e)
    }
  }

  async insertComment (req, res) {
    try {
      const keywoard = Array.from(new Set(filter.comment.split(' ')))
      await noticeService.pushNotice(keywoard, 'comment')
      const result = await commentService.insertComment(filter)
      return res.json(result)
    } catch (e) {
      return res.json(e)
    }
  }
}

new Comment()

module.exports = router;
