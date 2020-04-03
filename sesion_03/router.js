const {
  index,
  notFound,
  listFood,
  createFood,
  getFood,
  putFood,
  patchFood,
  deleteFood
} = require('./controller')

const Database = require('./database')

const db = new Database('./database/db.sqlite')
const connection = db.getConnection()

connection.serialize(async () => {
  connection.run(
    'CREATE TABLE IF NOT EXISTS food(name VARCHAR(255), price INT)'
  )
})

module.exports = function(req, res) {
  req.db = connection
  if (req.url === '/') {
    index(req, res)
  } else if (req.url === '/food' && req.method === 'GET') {
    listFood(req, res)
  } else if (req.url === '/food' && req.method === 'POST') {
    createFood(req, res)
  } else if (req.url.startsWith('/food') && req.method === 'GET') {
    getFood(req, res)
  } else if (req.url.startsWith('/food') && req.method === 'PUT') {
    putFood(req, res)
  } else if (req.url.startsWith('/food') && req.method === 'PATCH') {
    patchFood(req, res)
  } else if (req.url.startsWith('/food') && req.method === 'DELETE') {
    deleteFood(req, res)
  } else {
    notFound(req, res)
  }
}
