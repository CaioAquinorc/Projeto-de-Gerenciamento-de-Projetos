const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Ola Mundo!')
})

app.listen(8000)