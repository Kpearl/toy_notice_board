const express = require('express');
const router = express.Router();

const Joi = require('Joi')
const validator = require('express-joi-validation').createValidator({})

const boardService = require('../services/board')
const noticeService = require('../services/notice')
const commentService = require('../services/comment')
const { getPaging } = require('../utils/paging')

const schema = Joi.object({
  title: Joi.string(),
  contents: Joi.string(),
  name: Joi.string(),
  password: Joi.string()
})

class Board {
  constructor() {
    router.get('/', this.searchBoard) // 제목 & 작성자 검색
    router.get('/:id', this.getBoard) // 게시물 보기
    router.post('/', validator.body(schema), this.insertBoard) // 게시물 등록
    router.put('/:id', validator.body(schema), this.updateBoard) // 게시물 수정
    router.post('/:id', this.deleteBoard) // 게시물 삭제
  }

  async searchBoard(req, res) {
    try {
      const paging = getPaging(req)
      const keyword = req.query.keyword
      const result = await boardService.searchBoard(keyword, paging)
      return res.json(result)
      if (!!result) return res.json('관련 게시물이 없습니다.')
    } catch(e) {
      return res.json(e)
    }
  }

  async getBoard(req, res) {
    try {
      const id = req.params.id
      if (id) {
        const result = await boardService.getBoard(id)
        return res.json(result ? result : '해당 게시물이 없습니다.')
      }
      return res.json('해당 게시물이 없습니다.')
    } catch(e) {
      console.log(e)
      return res.json(e)
    }
  }

  async insertBoard(req, res) {
    try {
      const body = req.body
      if (body) {
        const filter = {
          title: body.title,
          contents: body.contents,
          name: body.name,
          password: body.password
        }
        const keywoard = Array.from(new Set(filter.contents.split(' ')))
        await noticeService.pushNotice(keywoard, 'board')
        const result = await boardService.insertBoard(body)
        return res.json(result)
      }
      return res.json('입력 내용을 확인하세요.')
    } catch(e) {
      console.log(e)
      return res.json(e)
    }
  }

  async updateBoard(req, res) {
    try {
      const id = req.params.id
      const body = req.body
      if (id && body) {
        const getBoard = await boardService.getBoard(id)
        if (!getBoard) return res.json('존재하지 않는 게시물 입니다.')
        const check = await boardService.checkPassword(id, body.password)
        if (!check) return res.json('비밀번호를 확인하세요.')
        const filter = {
          title: body.title,
          name: body.name,
          contents: body.contents,
          password: body.password,
          updated_at: new Date()
        }
        const result = await boardService.updateBoard(id, filter)
        return res.json('수정이 완료되었습니다.')
      }
      return res.json('입력 내용을 확인하세요.')
    } catch(e) {
      console.log(e)
      return res.json(e)
    }
  }

  async deleteBoard (req, res) {
    const id = req.params.id
    const password = req.body && req.body.password
    try {
      if (id && password) {
        const getBoard = await boardService.getBoard(id)
        if (!getBoard) return res.json('존재하지 않는 게시물 입니다.')
        const check = await boardService.checkPassword(id, password)
        if (!check) return res.json('비밀번호를 확인하세요.')
        await boardService.deleteBoard(id)
        await commentService.deleteComment(id)
        return res.json('삭제가 완료되었습니다.')
      }
      return res.json('입력 내용을 확인하세요.')
    } catch (e) {
      return res.json(e)
    }
  }
}

new Board()

module.exports = router;
