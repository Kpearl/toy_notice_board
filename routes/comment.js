var express = require('express');
var router = express.Router();

const commentService = require('../services/comment')

class Comment {
  constructor() {
    router.get('/:bbsId', this.getComment)
    router.post('/', this.insertComment)
  }

  async getComment(req, res) {
    try {
      const bbsId = req.params.bbsId
      if (bbsId) {
        const result = await commentService.getComment(bbsId)
        return result
      }
      return res.json([])
    } catch (e) {
      return res.json('Error getComment: ', e)
    }
  }

  async insertComment(req, res) {
    const result = await commentService.insertComment()
    return result
  }
}

new Comment()

module.exports = router;
