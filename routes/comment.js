var express = require('express')
var router = express.Router()

const commentService = require('../services/comment')

class Comment {
  constructor () {
    router.get('/:boardId', this.getComments)
    router.post('/:boardId', this.insertComment)
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
      const filter = {
        boards_id: req.params.boardId,
        name: req.body.name,
        comment: req.body.comment,
        parent_id: req.body.parentId
      }
      const result = await commentService.insertComment(filter)
      return res.json(result)
    } catch (e) {
      return res.json(e)
    }
  }
}

new Comment()

module.exports = router;
