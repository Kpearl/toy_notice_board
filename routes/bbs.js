var express = require('express');
var router = express.Router();

const bbsService = require('../services/bbs')

class Bbs {
  constructor() {
    router.get('/:id', this.getBbs)
    router.post('/', this.insertBbs)
    router.put('/:id', this.updateBbs)
    router.delete('/:id', this.deleteBbs)
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
        const filter = {
          title: body.title,
          name: body.name,
          password: body.password,
          updated_at: new Date()
        }
        const result = await bbsService.updateBbs(id, filter)
        return res.json(result)
      }
      return res.json('입력 내용을 확인하세요.')
    } catch(e) {
      console.log(e)
      return res.json('Error updateBbs: ', e)
    }
  }

  async deleteBbs(req, res) {
    try {
      const id = req.params.id
      const result = await bbsService.deleteBbs(id)
      return res.json(result)
    } catch(e) {
      console.log(e)
      return res.json('Error deleteBbs: ', e)
    }
  }
}

new Bbs()

module.exports = router;
