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

  async insertNotice() {
    try {
      const body = req.body
      if (body) {
        const filter = {
          name: body.name,
          keyword: body.keyword
        }
        const result = await noticeService.insertNotice(filter)
        return result
      }
      return res.json('입력 내용을 확인하세요.')
    }catch (e) {
      return res.json('입력 내용을 확인하세요.')
    }
  }
}

new Notice()

module.exports = router;
