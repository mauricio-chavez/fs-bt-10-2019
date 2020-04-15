const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.get('/query', (req, res) => {
  const {username} = req.query
  res.json({message: `Hello, @${username}!`})
})

app.get('/:username/params', (req, res) => {
  const {username} = req.params
  res.json({message: `Hello, @${username}!`})
})

app.post('/body', (req, res) => {
  const {username} = req.body
  res.json({message: `Hello, @${username}!`})
})

const server = app.listen(process.env.PORT || 3000, () => {
  const port = server.address().port
  console.log(`Listening on http://localhost:${port} 🚀`)
})
