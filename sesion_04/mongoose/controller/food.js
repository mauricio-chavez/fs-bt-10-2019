const FoodModel = require('../models/food')

module.exports.get = function (req, res) {
  FoodModel.find((err, data) => {
    if (err) {
      res.json({error: 'An error ocurred while getting data...'})
    } else {
      res.json(data)
    }
  })
}

module.exports.getById = function (req, res) {
  const {id} = req.params
  FoodModel.findById(id, (err, food) => {
    if (err) {
      res.json({error: 'An error ocurred while getting data...'})
    } else {
      res.json(food)
    }
  })
}

module.exports.create = function (req, res) {
  const {name, price} = req.body
  const food = new FoodModel({name, price})
  food.save((err, user) => {
    if (err) {
      res.json({error: 'An error ocurred while creating data...'})
    } else {
      res.json(user)
    }
  })
}

module.exports.update = function (req, res) {
  const {id} = req.params
  FoodModel.findById(id, (err, food) => {
    if (err) {
      res.status(404).json({error: `Couldn't find food`})
    } else {
      const {name, price} = req.body
      const updatedAt = Date.now()
      food.update({name, price, updatedAt}, (err) => {
        if (err) {
          console.error(err)
          res.status(500).json({error: `Couldn't update food`})
        } else {
          FoodModel.findById(id, (err, food) => {
            if (err) {
              res.status(500).json({error: `Couldn't find updated food`})
            } else {
              res.json(food)
            }
          })
        }
      })
    }
  })
}

module.exports.delete = function (req, res) {
  const {id} = req.params
  FoodModel.findById(id, (err, food) => {
    if (err) {
      res.status(404).json({error: `Couldn't find food`})
    } else {
      food.remove((err, deletedFood) => {
        if (err) {
          res.status(500).json({error: `Could't delete food`})
        } else {
          res.json(deletedFood)
        }
      })
    }
  })
}

// food/ -> GET, POST

// food/:id -> GET, PUT, (PATCH), DELETE
