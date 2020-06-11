const db = require('../../functions/realtimeDb')

function createUser(args) {
  const {newUser} = args
  const id = db.getNewID()
  return db.write(`users/${id}`, {...newUser, id})
}

module.exports = {
  createUser  
}