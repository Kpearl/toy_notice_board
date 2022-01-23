var express = require('express');
var router = express.Router();

const noticeService = require('../services/notice')

class Notice {
  constructor() {
    router.get('/', this.getNotice)
  }

  async getNotice() {
    const result = await noticeService.getNotice()
    return result
  }
}

new Notice()

module.exports = router;
