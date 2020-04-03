const {parse} = require('querystring')

let food = require('./models/food')

module.exports.index = function(req, res) {
  const response = JSON.stringify({message: 'Hola mundo'})
  res.write(response)
  res.end()
}

module.exports.notFound = function(req, res) {
  const response = JSON.stringify({message: 'Not found'})
  res.write(response)
  res.end()
}

module.exports.listFood = function(req, res) {
  // const response = JSON.stringify(food)
  // res.write(response)
  // res.end()

  req.db.all('SELECT * FROM food', (err, data) => {
    if (err) {
      res.write('Something went wrong')
      res.end()
    } else {
      res.write(JSON.stringify(data))
      res.end()
    }
  })
}

module.exports.createFood = function(req, res) {
  let body = []
  req
    .on('data', function(chunk) {
      body.push(chunk)
    })
    .on('end', function() {
      body = Buffer.concat(body).toString()
      if (body) {
        const {name, price} = parse(body)

        req.db.serialize(async () => {
          const stmt = req.db.prepare(
            `INSERT INTO food(name, price) VALUES (?, ?)`
          )
          stmt.run(name, price)
          stmt.finalize()
        })

        // food.push({name: name, price: price})
        res.write(JSON.stringify({name, price}))
        res.end()
      }
    })
}

module.exports.getFood = function(req, res) {
  const urlParts = req.url.split('/')
  const id = parseInt(urlParts[urlParts.length - 1].split('?')[0])
  if (id > food.length) {
    res.write(JSON.stringify({message: 'Not found'}))
    res.end()
  } else {
    res.write(JSON.stringify(food[id - 1]))
    res.end()
  }
}

module.exports.putFood = function(req, res) {
  const urlParts = req.url.split('/')
  const id = parseInt(urlParts[urlParts.length - 1].split('?')[0])
  if (id > food.length) {
    res.write(JSON.stringify({message: 'Not found'}))
    res.end()
  } else {
    const item = food[id - 1]
    let body = []
    req
      .on('data', function(chunk) {
        body.push(chunk)
      })
      .on('end', function() {
        body = Buffer.concat(body).toString()
        if (body) {
          const {name, price} = parse(body)

          if (!name || !price) {
            res.write(JSON.stringify({message: 'Invalid parameters'}))
            res.end()
          } else {
            item.name = name
            item.price = price
            food[id - 1] = item
            res.write(JSON.stringify(item))
            res.end()
          }
        }
      })
  }
}

module.exports.patchFood = function(req, res) {
  const urlParts = req.url.split('/')
  const id = parseInt(urlParts[urlParts.length - 1].split('?')[0])
  if (id > food.length) {
    res.write(JSON.stringify({message: 'Not found'}))
    res.end()
  } else {
    const item = food[id - 1]
    let body = []
    req
      .on('data', function(chunk) {
        body.push(chunk)
      })
      .on('end', function() {
        body = Buffer.concat(body).toString()
        if (body) {
          const {name, price} = parse(body)

          if (name) {
            item.name = name
          }

          if (price) {
            item.price = price
          }

          food[id - 1] = item
          res.write(JSON.stringify(item))
          res.end()
        }
      })
  }
}

module.exports.deleteFood = function(req, res) {
  const urlParts = req.url.split('/')
  const id = parseInt(urlParts[urlParts.length - 1].split('?')[0])
  if (id > food.length) {
    res.write(JSON.stringify({message: 'Not found'}))
    res.end()
  } else {
    delete food[id - 1]
    food = food.filter(item => item)
    res.write(JSON.stringify(food))
    res.end()
  }
}
