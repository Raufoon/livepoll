const db = require('../../../../realtimeDb')

module.exports = async function vote(_, args, context) {
  const {pollId, itemId, voteValue} = args
  
  try {
    const voterId = await context.getAuthUserId()
    
    await db.transaction(`edges/poll_item/${pollId}/${itemId}`, oldScore => oldScore - voteValue)
    await db.remove(`edges/voter_poll_item/${voterId}/${pollId}`)
    await db.transaction(`polls/${pollId}/totalVotes`, count => count - 1)
    
    const currentScore = await db.read(`edges/poll_item/${pollId}/${itemId}`)
    await db.write(`items/${itemId}/score`, currentScore)

    // TODO: if voter list is visible, delete that ID
  }
  catch(err) {
    return Promise.reject(err)
  }
  finally {
    return db.read(`items/${itemId}`)
  }
}
