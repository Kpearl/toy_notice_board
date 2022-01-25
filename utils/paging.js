class Paging {
  getPaging (req) {
    req.query.page = req.query.hasOwnProperty('page') ? Number(req.query.page) : 1
    req.query.size = req.query.hasOwnProperty('size') ? Number(req.query.size) : 10

    req.query.offset = (req.query.page - 1) * req.query.size
    req.query.index = Number(req.query.page - 1)

    const paging = {
      page: req.query.hasOwnProperty('page') ? Number(req.query.page) : 1,
      size: req.query.hasOwnProperty('size') ? Number(req.query.size) : 10,
      offset: (req.query.page - 1) * req.query.size,
      index: Number(req.query.page - 1)
    }

    return paging
  }
}

paging = new Paging()

module.exports = paging
