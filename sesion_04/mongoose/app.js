const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const FoodModel = require('./models/food')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()

mongoose.connect(
  process.env.MONGO_URL,
  {useNewUrlParser: true, useUnifiedTopology: true},
  (err) => {
    if (err) {
      console.error('Mongo is not connected...')
    } else {
      console.log('MongoDB connection successful...')
    }
  }
)

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/', (req, res) => {
  res.json({message: `Hello, world!`})
})

app.get('/users', (req, res) => {
  FoodModel.find((err, data) => {
    if (err) {
      res.json({error: 'An error ocurred while getting data...'})
    } else {
      res.json(data)
    }
  })
})

app.get('/users/:id', (req, res) => {
  const {id} = req.params
  FoodModel.findById(id, (err, food) => {
    if (err) {
      res.json({error: 'An error ocurred while getting data...'})
    } else {
      res.json(food)
    }
  })
})

app.post('/users', (req, res) => {
  const {name, price} = req.body
  const food = new FoodModel({name, price})
  food.save((err, user) => {
    if (err) {
      res.json({error: 'An error ocurred while creating data...'})
    } else {
      res.json(user)
    }
  })
})

const server = app.listen(process.env.PORT || 3000, () => {
  const port = server.address().port
  console.log(`Listening on http://localhost:${port} 🚀`)
})
