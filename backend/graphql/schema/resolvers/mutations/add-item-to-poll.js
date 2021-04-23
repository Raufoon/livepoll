const db = require('../../../../realtimeDb')
const { UsagePrivacy } = require('../../types/livepoll')

module.exports = async function addItemToPoll(_, args, context) {
  const {pollId, newItem} = args
  const id = newItem.id || db.getNewID()
  
  try {
    const itemCreatorId = await context.getAuthUserId()
    const pollUsagePrivacy = await db.read(`/poll/${pollId}/usagePrivacy`)
    
    if (pollUsagePrivacy === UsagePrivacy.getValue('PROTECTED')) {
      const pollCreatorId = await db.read(`/poll/${pollId}/author`)
    
      // if the poll is protected, only allow the author to add item
      if (itemCreatorId !== pollCreatorId) {
        throw new Error('Protected poll: only the poll author can add items')
      }
    }

    await db.write(`items/${id}`, {
      ...newItem, 
      id, 
      creatorId: itemCreatorId, 
      score: 0
    })
    await db.write(`edges/poll_item/${pollId}/${id}`, 0)
  }
  catch(err) {
    return Promise.reject(err)
  }
  finally {
    return db.read(`items/${id}`)
  }
}
