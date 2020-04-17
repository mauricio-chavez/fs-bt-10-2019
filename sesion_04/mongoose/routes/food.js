const express = require('express')
const foodController = require('../controller/food')

const foodRouter = express.Router()

foodRouter.get('/', foodController.get)
foodRouter.post('/', foodController.create)

foodRouter.get('/:id', foodController.getById)
foodRouter.put('/:id', foodController.update)
foodRouter.delete('/:id', foodController.delete)

module.exports = foodRouter
