const { body, validationResult } = require('express-validator')

async function validationCheck (req, res, next) {
  const error = validationResult(req)
  if (error) {
    return res.status(400).json({ error: error})
  }
  next()
}

module.exports = {
  validationCheck
}
