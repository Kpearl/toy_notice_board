const express = require('express')
const router = express.Router()

const Joi = require('Joi')
const validator = require('express-joi-validation').createValidator({})

const userService = require('../../services/user')

const schema = Joi.object({
  email: Joi.string(),
  password: Joi.string()
})

class Login {
  constructor () {
    router.post('/', validator.body(schema), this.login) // 로그인
  }

  async login (req, res) {
    try {
        const result = ''
        return res.json(result)
    } catch (e) {
      return res.json('입력 데이터를 확인하세요.')
    }
  }
}

new Login()

module.exports = router
