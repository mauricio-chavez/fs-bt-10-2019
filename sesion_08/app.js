const bodyParser = require('body-parser')
const cors = require('cors')
const express = require('express')
const { body, validationResult } = require('express-validator');
const mongoose = require('mongoose')
const MovieModel = require('./models/movie')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.get('/', async (req, res) => {
  const movies = await MovieModel.find()
  res.json(movies)
})

app.get('/:id', async (req, res) => {
  const { id } = req.params
  const movie = await MovieModel.findById(id)
  res.json(movie)
})

app.delete('/:id', async (req, res) => {
  const { id } = req.params
  const movie = await MovieModel.findByIdAndDelete(id)
  res.json(movie)
})

app.post('/', [
  body('title').isString().not().isEmpty(),
  body('director').isString(),
  body('productionBudget').isNumeric(),
  body('releaseDate').isString(),
  body('rottenTomatoesRating').isFloat(),
  body('imdbRating').isFloat(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    const movie = await MovieModel.create(req.body)
    res.json(movie)
  }
})

const server = app.listen(process.env.PORT || 3000, async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log(`Listening on ${server.address().port}`)
  } catch(e) {
    console.log(e)
    console.log('Error while connecting to database')
    process.exit(1)
  }
})
