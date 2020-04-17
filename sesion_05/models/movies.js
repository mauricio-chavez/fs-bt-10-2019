const {Schema, model} = require('mongoose')

const movieModel = new Schema({
  name: String,
  director: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = model('Movie', movieModel)
