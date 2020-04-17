const jwt = require('jsonwebtoken')
const {ApolloError} = require('apollo-server')
const MovieModel = require('../../models/movies')

module.exports.queries = {
  movies: async (_, args) => {
    const {token} = args
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
      return await MovieModel.find()
    } catch (err) {
      throw new ApolloError('Invalid token')
    }
  },
}

module.exports.mutations = {
  createMovie: async (_, args) => {
    const movie = new MovieModel(args)
    return await movie.save()
  },
}
