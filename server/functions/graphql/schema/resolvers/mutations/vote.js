const db = require('../../../../realtimeDb')

module.exports = async function vote(_, args, context) {
  const {pollId, itemId, voteValue} = args

  try {
    const voterId = await context.getAuthUserId()
    const alreadyVotedItemId = await db.read(`edges/voter_poll_item/${voterId}/${pollId}`)

    if (itemId === alreadyVotedItemId) {
      throw new Error('You have already voted for this item')
    }

    await db.transaction(`edges/poll_item/${pollId}/${itemId}`, oldScore => oldScore + voteValue)
    await db.write(`edges/voter_poll_item/${voterId}/${pollId}`, itemId)
    
    const currentScore = await db.read(`edges/poll_item/${pollId}/${itemId}`)
    await db.write(`items/${itemId}/score`, currentScore)

    // TODO: if voter list is visible, save an edge item_voters/ITEM_ID/VOTER_ID = true

    if (!!alreadyVotedItemId) {
      await db.transaction(`edges/poll_item/${pollId}/${alreadyVotedItemId}`, oldScore => oldScore - voteValue)
      const scoreOfCancelledItem = await db.read(`edges/poll_item/${pollId}/${alreadyVotedItemId}`)
      await db.write(`items/${alreadyVotedItemId}/score`, scoreOfCancelledItem)
    }
  }
  catch(err) {
    return Promise.reject(err)
  }
  finally {
    return db.read(`items/${itemId}`)
  }
}
