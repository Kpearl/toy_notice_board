var express = require('express');
var router = express.Router();

const bbsService = require('../services/bbs')
const { getPaging } = require('../utils/paging')

class Bbs {
  constructor() {
    router.get('/', this.searchBbs) // 제목 & 작성자 검색
    router.get('/:id', this.getBbs) // 게시물 보기
    router.post('/', this.insertBbs) // 게시물 등록
    router.put('/:id', this.updateBbs) // 게시물 수정
    router.post('/:id', this.deleteBbs) // 게시물 삭제
  }

  async searchBbs(req, res) {
    try {
      const paging = getPaging(req)
      const keyword = req.params.keyword
      const result = await bbsService.searchBbs(keyword, paging)
      return res.json(result)
      if (!!result) return res.json('관련 게시물이 없습니다.')
    } catch(e) {
      return res.json(e)
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
      return res.json(e)
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
      return res.json(e)
    }
  }

  async updateBbs(req, res) {
    try {
      const id = req.params.id
      const body = req.body
      if (id && body) {
        const getBbs = await bbsService.getBbs(id)
        if (!getBbs) return res.json('존재하지 않는 게시물 입니다.')
        const check = await bbsService.checkPassword(id, body.password)
        if (!check) return res.json('비밀번호를 확인하세요.')
        const filter = {
          title: body.title,
          name: body.name,
          password: body.password,
          updated_at: new Date()
        }
        const result = await bbsService.updateBbs(id, filter)
        return res.json('수정이 완료되었습니다.')
      }
      return res.json('입력 내용을 확인하세요.')
    } catch(e) {
      console.log(e)
      return res.json(e)
    }
  }

  async deleteBbs (req, res) {
    const id = req.params.id
    const password = req.body && req.body.password
    try {
      if (id && password) {
        const getBbs = await bbsService.getBbs(id)
        if (!getBbs) return res.json('존재하지 않는 게시물 입니다.')
        const check = await bbsService.checkPassword(id, password)
        if (!check) return res.json('비밀번호를 확인하세요.')
        await bbsService.deleteBbs(id)
        return res.json('삭제가 완료되었습니다.')
      }
      return res.json('입력 내용을 확인하세요.')
    } catch (e) {
      return res.json(e)
    }
  }
}

new Bbs()

module.exports = router;
