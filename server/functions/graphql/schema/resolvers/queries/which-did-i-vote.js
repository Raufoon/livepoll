const db = require('../../../../realtimeDb')

module.exports = async function whichDidIVote(_, args, context) {
  const {pollId} = context
  try {
    const voterId = await context.getAuthUserId()
    const votedItemId = await db.read(`edges/voter_poll_item/${voterId}/${pollId}`)
    return Promise.resolve(votedItemId)
  }
  catch(err) {
    return Promise.reject(err)
  }
}
