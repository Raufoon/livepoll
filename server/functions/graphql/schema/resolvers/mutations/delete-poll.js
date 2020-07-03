const admin = require('firebase-admin')
const db = require('../../../../realtimeDb')

module.exports = async function (_, args, context) {
  const {pollId} = args

  try {
    const clientId = await context.getAuthUserId()
    const authorId = await db.read(`polls/${pollId}/author`)

    if (clientId !== authorId) return Promise.reject(false)

    // remove some edges with the poll
    await db.remove(`edges/author_poll/${authorId}/${pollId}`)
    await db.remove(`edges/home_poll/${pollId}`)

    const itemContentType = await db.read(`polls/${pollId}/itemContentType`)
    const shouldShowVoters = await db.read(`polls/${pollId}/shouldShowVoters`)
    await db.remove(`polls/${pollId}`)
    
    // get all the item ids of this poll
    const itemIds = await db.readKeysAsList(`edges/poll_item/${pollId}`)
    await db.remove(`edges/poll_item/${pollId}`)
    
    // for all item ids
    for (let i = 0; i < itemIds.length; i++) {
      let itemId = itemIds[i]

      // fetch the voter id list
      if (shouldShowVoters) {
        const voterIds = await db.readAsList(`edges/item_voters/${itemId}`)
        await db.remove(`edges/item_voters/${itemId}`)
        
        // delete edge between the voters and the poll
        for(let j = 0; j < voterIds.length; j++) {
          let voterId = voterIds[j]
          await db.remove(`edges/voter_poll_item/${voterId}/${pollId}`)
        }
      }

      if (itemContentType === 'AVATAR_TEXT' || itemContentType === 'IMAGE_CAPTION' || itemContentType === 'IMAGE_ONLY') {
        // delete the images for items
        const imageUrl = await db.read(`items/${itemId}/imgUrl`)
        admin.storage().bucket().delete(imageUrl)
      }

      await db.remove(`items/${itemId}`)
    }
    
    // delete images too
  }
  catch(err) {
    return Promise.reject({isComplete: false})
  }
  finally {
    return Promise.resolve({isComplete: true})
  }
}
