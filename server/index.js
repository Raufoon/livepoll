const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.sendFile('test.html', {root: __dirname})
})

app.listen(9000, function () {
  console.log("Listening at 9000")
})
