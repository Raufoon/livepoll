const db = require('../../../../realtimeDb')

module.exports = async function poll(_, args) {
  const {id} = args
  return db.read(`polls/${id}`)
}
