const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  title: String,
  director: String,
  productionBudget: Number,
  releaseDate: String,
  rottenTomatoesRating: Number,
  imdbRating: Number
})

module.exports = mongoose.model('movies', movieSchema)
