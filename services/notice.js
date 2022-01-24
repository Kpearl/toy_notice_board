const _ = require('lodash')

class noticeService {
  async getNotice (id, type) {
    console.log(id, '에게 ', type, ' 알림 전송')
    return result
  }

  async insertNotice (body) {
    const result = await models.notices.create(body)
    return result
  }
}

module.exports = new noticeService()
