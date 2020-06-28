const functions = require('firebase-functions')
const admin = require('firebase-admin')

exports.write = (path, object) => {
  return new Promise((resolve, reject) => {
    admin.database().ref(`/${path}`)
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

exports.read = (path, options={}) => {
  let ref = admin.database().ref(`/${path}`)

  const {sortByValue, howMany} = options

  if (sortByValue) {
    ref = ref.orderByValue()
  }

  if (howMany) {
    ref = ref.limitToLast(howMany)
  }

  return ref
    .once('value')
    .then(snap => snap.val())
}

exports.readAsList = (path, options={}) => {
  let ref = admin.database().ref(`/${path}`)

  if (options.sortByValue) {
    ref = ref.orderByValue()
  }

  return ref.once('value')
    .then(snap => 
      Object.values(snap.val() || {}))
}

exports.readKeysAsList = (path) => {
  return admin.database().ref(`/${path}`)
    .once('value')
    .then(snap => {
      return Object.keys(snap.val() || {})
    })
}

exports.remove = (path) => {
  return admin.database().ref(`${path}`).remove()
}

exports.getNewID = () => admin.database().ref().push().key

exports.transaction = function(path, doTransaction) {
  return admin.database().ref(path)
    .transaction(function(data) {
      if (data === undefined) {
        return Promise.reject(`No data at ${path}`)
      }
      return doTransaction(data)
    })
}
