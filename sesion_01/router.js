const controllers = require('./controllers/index')

function router(req, res) {
  switch (req.url) {
    case '/':
      controllers.indexController(req, res)
      break
    default:
      controllers.notFoundController(req, res)
      break
  }
}

module.exports = router