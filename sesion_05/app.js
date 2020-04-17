const {ApolloServer} = require('apollo-server')
const mongoose = require('mongoose')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
require('dotenv').config()

const server = new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => {
  mongoose.connect(
    process.env.DATABASE_URL,
    {useNewUrlParser: true, useUnifiedTopology: true},
    (err) => {
      if (err) {
        throw err
      } else {
        console.log('MongoDB is connected...')
        console.log(`🚀  Server ready at ${url}`)
      }
    }
  )
})
