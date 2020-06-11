const functions = require('firebase-functions')
const admin = require('firebase-admin')

exports.write = (path, object) => {
  return new Promise((resolve, reject) => {
    admin.database().ref(`/v_2_0_0/${path}`)
      .set(object, (err) => {
        if (err) {
          reject(err)
        }
        else {
          resolve(object)
        }
      })
  })
}

exports.getNewID = () => admin.database().ref().push().key