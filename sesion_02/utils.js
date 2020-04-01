const path = require('path')
const fs = require('fs')

const mimeTypes = {
  html: 'text/html',
  css: 'text/css',
  js: 'application/javascript',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  gif: 'image/gif'
}

function serveStatic(request, response) {
  const filepath = path.join(__dirname, 'assets', request.url)
  const extension = filepath.split('.')[1]

  fs.readFile(filepath, (err, data) => {
    if (err) {
      response.write('Error while reading asset')
      response.end()
    } else {
      response.writeHead(200, {'Content-Type': mimeTypes[extension]})
      response.write(data)
      response.end()
    }
  })
}

function render(response, template, context = {}) {
  const filepath = path.join(__dirname, 'views', template)
  fs.readFile(filepath, (err, data) => {
    if (err) {
      response.write('Template not found')
      response.end()
    } else {
      let html = data.toString()
      for (variable in context) {
        html = html.replace(`{{ ${variable} }}`, context[variable])
      }
      response.writeHead(200, {'Content-Type': 'text/html'})
      response.write(html)
      response.end()
    }
  })
}

function json(response, data) {
  response.writeHeader(200, {'Content-Type': 'application/json'})
  response.write(JSON.stringify(data))
  response.end()
}

module.exports = {
  serveStatic: serveStatic,
  render: render,
  json: json
}
