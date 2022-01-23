var express = require('express');
var router = express.Router();

const commentService = require('../services/comment')

class Comment {
  constructor() {
    router.get('/', this.getComment)
    router.post('/', this.insertComment)
  }

  async getComment() {
    const result = await commentService.getComment()
    return result
  }

  async insertComment() {
    const result = await commentService.insertComment()
    return result
  }
}

new Comment()

module.exports = router;
