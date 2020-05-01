const { gql } = require('apollo-server')

const typeDefs = gql`

  input Registry {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }

  enum SortDirection {
    ascending,
    descending
  }

  enum SortableMovieField {
    title,
    productionBudget
  }

  enum FilterOperatorField {
    gt,
    gte,
    lt,
    lte,
    eq
  }

  type Movie {
    _id: ID
    title: String,
    director: String,
    productionBudget: Int,
    releaseDate: String,
    imdbRating: Float,
    rottenTomatoesRating: Float
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
    movies(
      page: Int = 1,
      limit: Int = 10,
      sort: SortDirection = ascending,
      sortField: SortableMovieField = title,
      filterOperator: FilterOperatorField,
      filterValue: Int
    ): [Movie]!
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