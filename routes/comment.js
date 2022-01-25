var express = require('express')
var router = express.Router()

const commentService = require('../services/comment')

class Comment {
  constructor () {
    router.get('/:bbsId', this.getComments)
    router.post('/:bbsId', this.insertComment)
  }

  async getComments (req, res) {
    try {
      const bbsId = req.params.bbsId
      if (bbsId) {
        const result = await commentService.getComments(bbsId)
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
        bbs_id: req.params.bbsId,
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
