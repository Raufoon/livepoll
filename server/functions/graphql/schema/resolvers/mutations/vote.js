const db = require('../../../../realtimeDb')

module.exports = async function vote(_, args, context) {
  const {pollId, itemId, voteValue} = args

  try {
    const voterId = await context.getAuthUserId()
    await db.transaction(`edges/poll_item/${pollId}/${itemId}`, oldScore => oldScore + voteValue)
    // TODO: if voter list is visible, save an edge item_voters/ITEM_ID/VOTER_ID = true
    await db.write(`edges/voter_poll_item/${voterId}/${pollId}`, itemId)
  }
  catch(err) {
    return Promise.reject(err)
  }
  finally {
    return db.read(`items/${itemId}`)
  }
}
