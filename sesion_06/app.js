const {ApolloServer} = require('apollo-server')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')
const UserModel = require('./models/user')
require('dotenv').config()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async function ({req, connection}) {
    if (connection) {
      return connection.context
    } else {
      const authorization = req.headers.authorization || ''
      const token = authorization.split(' ')[1]
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY)
        const user = await UserModel.findOne({email: decoded.email})
        return {user, isAuthenticated: true}
      } catch {
        return {user: null, isAuthenticated: false}
      }
    }
  },
})

server.listen().then(({url, subscriptionsUrl}) => {
  mongoose.connect(
    process.env.DATABASE_URL,
    {useNewUrlParser: true, useUnifiedTopology: true},
    (err) => {
      if (err) {
        throw err
      } else {
        console.log('MongoDB is connected...')
        console.log(`🚀  Server ready at ${url}`)
        console.log(`🚀  Subscriptions ready at ${subscriptionsUrl}`)
      }
    }
  )
})
