const path = require('path')
const express = require('express')
const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.get('/', (req, res) => {
  res.render('index', {title: 'Hola, Pug', message: 'Hola mundo'})
})

app.get('/another', (req, res) => {
  res.render('another')
})

const server = app.listen(process.env.PORT || 3000, () => {
  const port = server.address().port
  console.log(`Listening on http://localhost:${port} 🚀`)
})
