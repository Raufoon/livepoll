const Busboy = require('busboy')
const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const os = require('os')
const admin = require('firebase-admin')

router.post('/avatar', async function (request, response) {
  const {uid} = await admin.auth().verifyIdToken(request.headers.authorization)
  
  if (!uid) {
    response.sendStatus(403)
    response.end()
  }
  
  const busboy = new Busboy({headers: request.headers})
  const tmpdir = os.tmpdir()
  let upload;
  let fileWrite;
  
  busboy.on('file', (fieldname, file, filename) => {
    upload = path.join(tmpdir, filename)
    const writeStream = fs.createWriteStream(upload)
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
    const bucket = admin.storage().bucket()
    const destination = `avatars/${uid}_${Date.now()}.${path.extname(upload)}`
    await bucket.upload(upload, {destination})
    fs.unlinkSync(upload)

    const uploadedImgUrl = `https://storage.googleapis.com/lllivepolll.appspot.com/${destination}`;
    response.send(JSON.stringify({uploadedImgUrl}))
  })

  busboy.end(request.rawBody)
})

module.exports = router
