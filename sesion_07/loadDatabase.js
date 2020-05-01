const axios = require('axios').default
const mongoose = require('mongoose')
const MovieModel = require('./models/movies')
require('dotenv').config()

async function getData() {
  await mongoose.connect(
    process.env.DATABASE_URL,
    {useNewUrlParser: true, useUnifiedTopology: true}
  )
  
  const response = await axios.get(
    'https://raw.githubusercontent.com/vega/vega/master/docs/data/movies.json'
  )
  
  for (const movie of response.data) {
    const data = {
      title: movie.Title,
      director: movie.Director,
      productionBudget: movie.Production_Budget,
      releaseDate: movie.Release_Date,
      rottenTomatoesRating: movie.Rotten_Tomatoes_Rating,
      imdbRating: movie.IMDB_Rating,
    }

    const movieModel = new MovieModel(data)
    movieModel.save()
  }


  await mongoose.disconnect()
  
}

getData()