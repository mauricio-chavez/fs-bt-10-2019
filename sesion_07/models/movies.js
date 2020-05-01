const {Schema, model} = require('mongoose')

const movieModel = new Schema({
  title: String,
  director: String,
  productionBudget: Number,
  releaseDate: String,
  imdbRating: Number,
  rottenTomatoesRating: Number
})

module.exports = model('Movie', movieModel)
