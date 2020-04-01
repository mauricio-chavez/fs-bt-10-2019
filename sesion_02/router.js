const {serveStatic} = require('./utils')
const {index, corgi, allCourses} = require('./controllers/index')

function router(request, response) {
  switch (request.url) {
    case '/':
      index(request, response)
      break
    case '/corgi':
      corgi(request, response)
      break
    case '/courses':
      allCourses(request, response)
      break
    default:
      serveStatic(request, response)
      break
  }
}

module.exports = router
