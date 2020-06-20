const db = require('../../../../realtimeDb')

module.exports = async function user(_, args) {
  const {id} = args
  return db.read(`users/${id}`)
}
