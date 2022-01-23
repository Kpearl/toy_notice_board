var express = require('express');
var router = express.Router();

const bbsService = require('../services/bbs')

class Bbs {
  constructor() {
    router.get('/', this.searchBbs) // 제목 & 작성자 검색
    router.get('/:id', this.getBbs) // 게시물 보기
    router.post('/', this.insertBbs) // 게시물 등록
    router.put('/:id', this.updateBbs) // 게시물 수정 & 삭제
  }

  async searchBbs(req, res) {
    try {
      const keyword = req.params.keyword
      const result = await bbsService.searchBbs(keyword)
      return res.json(result)
      if (!!result) return res.json('관련 게시물이 없습니다.')
    } catch(e) {
      return res.json('Error searchBbs: ', e)
    }
  }

  async getBbs(req, res) {
    try {
      const id = req.params.id
      if (id) {
        const result = await bbsService.getBbs(id)
        return res.json(result ? result : '해당 게시물이 없습니다.')
      }
      return res.json('해당 게시물이 없습니다.')
    } catch(e) {
      console.log(e)
      return res.json('Error getBbs: ', e)
    }
  }

  async insertBbs(req, res) {
    try {
      const body = req.body
      if (body) {
        const filter = {
          title: body.title,
          name: body.name,
          password: body.password
        }
        const result = await bbsService.insertBbs(body)
        return res.json(result)
      }
      return res.json('입력 내용을 확인하세요.')
    } catch(e) {
      console.log(e)
      return res.json('Error insertBbs: ', e)
    }
  }

  async updateBbs(req, res) {
    try {
      const id = req.params.id
      const body = req.body
      if (id && body) {
        const check = await bbsService.checkPassword(id, password)
        let result = {}
        switch (body.type.toLocaleUpperCase()) {
          case 'UP':
            const password = (req.body && req.body.password) ? req.body.password : false
            // if(case )
            const filter = {
              title: body.title,
              name: body.name,
              password: body.password,
              updated_at: new Date()
            }
            result = await bbsService.updateBbs(id, filter)
            break
          case 'CX':
            if (id && password) {
              result = await bbsService.deleteBbs(id)
            }
            break
        }
        if (result === 0) return res.json('존재하지 않는 게시물 입니다.')
        if (result === 1) return res.json('삭제가 완료되었습니다.')
        return res.json(result)
      }
      return res.json('입력 내용을 확인하세요.')
    } catch(e) {
      console.log(e)
      return res.json('Error updateBbs: ', e)
    }
  }
}

new Bbs()

module.exports = router;
