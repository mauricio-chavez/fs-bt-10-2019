const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const foodRouter = require('./routes/food')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()

mongoose.connect(
  process.env.MONGO_URL,
  {useNewUrlParser: true, useUnifiedTopology: true},
  (err) => {
    if (err) {
      throw `MongoDB couldn't be connected.`
    } else {
      console.log('MongoDB connection successful...')
    }
  }
)

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use('/food', foodRouter)

app.get('/', (req, res) => {
  res.json({message: `Hello, world!`})
})

const server = app.listen(process.env.PORT || 3000, () => {
  const port = server.address().port
  console.log(`Listening on http://localhost:${port} 🚀`)
})
