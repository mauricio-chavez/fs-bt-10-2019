const moviesResolvers = require('./movies')
const usersResolvers = require('./users')

const resolvers = {
  Query: {
    ...moviesResolvers.queries
  },
  Mutation: {
    ...moviesResolvers.mutations,
    ...usersResolvers.mutations
  },
  Subscription: {
    ...moviesResolvers.subscriptions
  }
}

module.exports = resolvers