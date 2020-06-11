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

exports.read = (path) => {
  return admin.database().ref(`/v_2_0_0/${path}`)
    .once('value')
    .then(snap => snap.val())
}

exports.readAsList = (path) => {
  return admin.database().ref(`/v_2_0_0/${path}`)
    .once('value')
    .then(snap => 
      Object.values(snap.val() || {}))
}

exports.remove = (path) => {
  return admin.database().ref(`v_2_0_0/${path}`).remove()
}

exports.getNewID = () => admin.database().ref().push().key