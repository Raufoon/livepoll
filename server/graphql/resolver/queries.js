const db = require('../../functions/realtimeDb')

function user(args) {
  const {id} = args
  return db.read(`users/${id}`)
}

function users() {
  return db.readAsList('users')
}

module.exports = {
  user,
  users
}