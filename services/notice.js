const _ = require('lodash')

const models = require('../models')

class noticeService {
  async pushNotice (keyword, type) {
    await keyword.map(async word => {
      const notice = await models.notices.findAll({ where: { keyword: word }})
      if (notice.length > 0) {
        const result = _.map(notice,
          function(noti) { // 알림 전송
          const result = noti.name + '에게 ' + type + ' 에서 ' + noti.keyword + ' 알림 전송'
            console.log(result)
        })
      }
    })
  }
}

module.exports = new noticeService()
