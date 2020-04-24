const {PubSub}  = require('apollo-server')

const pubsub = new PubSub()
const MOVIE_ADDED = 'MOVIE_ADDED'

module.exports = {
  pubsub,
  MOVIE_ADDED,
}