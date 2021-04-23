const db = require('../../../../realtimeDb')

module.exports = async function vote(_, args, context) {
  const {pollId, itemId, voteValue} = args
  
  try {
    const unvoterId = await context.getAuthUserId()
    const voterId = await db.read(`polls/${pollId}/author`)

    // unvote is only possible when the Unvoter has previously voted for the same item
    if (voterId === unvoterId) {
      
      // decrease vote count of the item
      await db.transaction(`edges/poll_item/${pollId}/${itemId}`, oldScore => oldScore - voteValue)
      
      // remove the voter poll item relationship
      await db.remove(`edges/voter_poll_item/${voterId}/${pollId}`)
      
      // total vote count of the entire poll decreases by 1
      await db.transaction(`polls/${pollId}/totalVotes`, count => count - 1)
      
      // update the item details with updated vote count
      const currentScore = await db.read(`edges/poll_item/${pollId}/${itemId}`)
      await db.write(`items/${itemId}/score`, currentScore)

      // if voter list is visible, delete that voter ID
      const showVoterList = await db.read(`polls/${pollId}/shouldShowVoters`)
      if (showVoterList) {
        await db.remove(`edges/item_voters/${itemId}/${voterId}`)
      }
    }
  }
  catch(err) {
    return Promise.reject(err)
  }
  finally {
    return db.read(`items/${itemId}`)
  }
}
