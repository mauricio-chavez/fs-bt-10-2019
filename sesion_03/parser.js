const {parse} = require('querystring')

module.exports = function(req) {
  let body = []
  let bodyObject
  req
    .on('data', function(chunk) {
      body.push(chunk)
    })
    .on('end', function() {
      body = Buffer.concat(body).toString()
      if (body) {
        bodyObject = parse(body)
      } else {
        bodyObject = {}
      }
    })
  return bodyObject
}
