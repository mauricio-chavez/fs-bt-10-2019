const courses = require('../models/courses')
const {render, json} = require('../utils')

function index(request, response) {
  let ul = '<ul>'
  courses.forEach(course => {
    ul += `<li>${course}</li>`
  })
  ul += '</ul>'
  render(response, 'index.html', {courses: ul, title: 'Nuevo título'})
}

function corgi(request, response) {
  render(response, 'corgi.html')
}

function allCourses(request, response) {
  json(response, {message: 'Hello world'})
}

module.exports = {
  index,
  corgi,
  allCourses
}
