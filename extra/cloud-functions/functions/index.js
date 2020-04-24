const functions = require('firebase-functions')
const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())

app.get('/', (req, res) => {
  res.json({message: 'Hello from Express'})
})

app.get('/:name', (req, res) => {
  const {name} = req.params
  res.json({message: `Hello, ${name}`})
})

exports.express = functions.https.onRequest(app)
