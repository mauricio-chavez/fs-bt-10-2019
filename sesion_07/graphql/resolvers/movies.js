const {ApolloError} = require('apollo-server')
const MovieModel = require('../../models/movies')
const {pubsub, MOVIE_ADDED} = require('../pubsub')

module.exports.queries = {
  movies: async (_parent, {page, limit, sort, sortField, filterOperator, filterValue}, context) => {
    if (context.isAuthenticated) {
      let movies
      const skip = (page - 1) * limit
      if (filterOperator && filterValue) {
        movies = MovieModel.find({
          productionBudget: {
            [`$${filterOperator}`]: filterValue
          }
        })
      } else {
        movies = MovieModel.find()
      }
      return await movies
        .skip(skip)
        .limit(limit)
        .sort({
          [sortField]: sort
        })
    } else {
      return new ApolloError('User is not authenticated')
    }
  },
}

module.exports.mutations = {
  createMovie: async (_, args, {isAuthenticated}) => {
    if (isAuthenticated) {
      let movie = new MovieModel(args)
      movie = await movie.save()
      pubsub.publish(MOVIE_ADDED, {movieAdded: movie})
      return movie
    } else {
      return new ApolloError('User is not authenticated')
    }
  },
}

module.exports.subscriptions = {
  movieAdded: {
    subscribe: () => pubsub.asyncIterator([MOVIE_ADDED]),
  },
}
