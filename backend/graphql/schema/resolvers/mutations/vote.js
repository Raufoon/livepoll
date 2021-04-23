const db = require('../../../../realtimeDb')

module.exports = async function vote(_, args, context) {
  const {pollId, itemId, voteValue} = args
  let alreadyVotedItemId;

  try {
    // get the ID of the Client
    const voterId = await context.getAuthUserId()

    // if the Client has already voted some other element, get that item ID
    alreadyVotedItemId = await db.read(`edges/voter_poll_item/${voterId}/${pollId}`)

    // forbid voting the same item twice
    if (itemId === alreadyVotedItemId) {
      throw new Error('You have already voted for this item')
    }

    // increase the votecount of the voted item
    await db.transaction(`edges/poll_item/${pollId}/${itemId}`, oldScore => oldScore + voteValue)
    
    // save the poll voter item relationship
    await db.write(`edges/voter_poll_item/${voterId}/${pollId}`, itemId)
    
    // if the Client hasn't already voted another item, the total vote count increases by 1
    if (!alreadyVotedItemId) {
      await db.transaction(`polls/${pollId}/totalVotes`, count => count + 1)
    }
    
    // update the vote count in the item details
    const currentScore = await db.read(`edges/poll_item/${pollId}/${itemId}`)
    await db.write(`items/${itemId}/score`, currentScore)

    // if voter list is visible, save the voter id in a list corresponding to that item
    const showVoterList = await db.read(`polls/${pollId}/shouldShowVoters`)
    if (showVoterList) {
      await db.write(`edges/item_voters/${itemId}/${voterId}`, voterId)
    }

    // if Client previously voted an item
    if (!!alreadyVotedItemId) {
      // decrease the vote count of that item
      await db.transaction(`edges/poll_item/${pollId}/${alreadyVotedItemId}`, oldScore => oldScore - voteValue)
      
      // update the vote count of that cancelled item
      const scoreOfCancelledItem = await db.read(`edges/poll_item/${pollId}/${alreadyVotedItemId}`)
      await db.write(`items/${alreadyVotedItemId}/score`, scoreOfCancelledItem)
      
      // if voter list is visible, delete the voter id from the voter list of the cancelled item
      await db.remove(`edges/item_voters/${alreadyVotedItemId}/${voterId}`)
    }
  }
  catch(err) {
    return Promise.reject(err)
  }
  finally {
    if (!!alreadyVotedItemId) {
      return [
        db.read(`items/${itemId}`),
        db.read(`items/${alreadyVotedItemId}`)
      ]
    }
    return [db.read(`items/${itemId}`)]
  }
}
