const fs = require('fs')
const path = require('path')
const model = require('../models')

function indexController(req, res) {
  const indexPath = path.join(path.dirname(__dirname), 'views/index.html')
  fs.readFile(indexPath, (err, data) => {
    if (!err) {
      let html = data.toString().replace('{{firstName}}', model.firstName)
      html = html.replace('{{lastName}}', model.lastName)
      res.write(html)
      res.end()
    } else {
      res.write('¡Ha ocurrido un problema!')
      res.end()
    }
  })
}

function notFoundController(req, res) {
  const indexPath = path.join(path.dirname(__dirname), 'views/404.html')
  fs.readFile(indexPath, (err, data) => {
    if (!err) {
      res.write(data)
      res.end()
    } else {
      res.write('¡Ha ocurrido un problema!')
      res.end()
    }
  })
}

module.exports = {
  indexController,
  notFoundController
}
