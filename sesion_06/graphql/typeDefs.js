const { gql } = require('apollo-server')

const typeDefs = gql`

  input Registry {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  type Movie {
    _id: ID
    name: String
    director: String
  }

  type User {
    _id: ID
    firstName: String
    lastName: String
    email: String
  }

  type Auth {
    token: String!
  }

  type Query {
    movies: [Movie]!
  }

  type Mutation {
    createMovie(name: String! director: String!): Movie!
    login(email: String! password: String!): Auth!
    signUp(registry: Registry!): User!
  }

  type Subscription {
    movieAdded: Movie!
  }

`

module.exports = typeDefs