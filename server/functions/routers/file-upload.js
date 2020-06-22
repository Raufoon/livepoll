const Busboy = require('busboy')
const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const os = require('os')
const admin = require('firebase-admin')
const sharp = require('sharp')

router.post('/avatar', async function (request, response) {
  const {uid} = await admin.auth().verifyIdToken(request.headers.authorization)
  
  if (!uid) {
    response.sendStatus(403)
    response.end()
  }
  
  const busboy = new Busboy({headers: request.headers})
  const tmpdir = os.tmpdir()
  let rawImgPath;
  let fileWrite;
  
  busboy.on('file', (fieldname, file, filename) => {
    rawImgPath = path.join(tmpdir, filename)
    const writeStream = fs.createWriteStream(rawImgPath)
    file.pipe(writeStream)

    fileWrite = new Promise(function(resolve, reject) {
      file.on('end', function() {
        writeStream.end()
      })
      writeStream.on('finish', resolve)
      writeStream.on('error', reject)
    })
  })
  
  busboy.on('finish', async function() {
    await fileWrite
    const outputImgName = `${uid}_${Date.now()}.${path.extname(rawImgPath)}`

    const resizedImgPath = path.join(tmpdir, outputImgName)

    await sharp(rawImgPath).resize(256, null).toFile(resizedImgPath);

    const destination = `avatars/${outputImgName}`
    await admin.storage().bucket().upload(resizedImgPath, {destination})

    fs.unlinkSync(rawImgPath)
    fs.unlinkSync(resizedImgPath)

    const uploadedImgUrl = `https://storage.googleapis.com/lllivepolll.appspot.com/${destination}`;
    response.send(JSON.stringify({uploadedImgUrl}))
  })

  busboy.end(request.rawBody)
})

module.exports = router
