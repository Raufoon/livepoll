const db = require('../../../../realtimeDb')

module.exports = async function voterList(_, args) {
  const {itemId} = args
  const voterListIds = await db.readAsList(`edges/item_voters/${itemId}`)
  return voterListIds.map(id => db.read(`users/${id}`))
}
