const express = require('express')
const multer = require('multer')
const cors = require('cors')({origin: true})
const fileUpload = require('./functions/routers/file-upload')

const app = express()

app.use(cors)

app.use('/upload', fileUpload)

app.listen(9000, function () {
  console.log("Listening at 9000")
})
