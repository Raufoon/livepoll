const db = require('../../../../realtimeDb')

module.exports = async function createLivePoll(_, args, context) {
  const id = db.getNewID()
  const {newPoll} = args

  try {
    const authorId = await context.getAuthUserId()
    await db.write(`polls/${id}`, {...newPoll, id, author: authorId, totalVotes: 0})
    await db.write(`edges/author_poll/${authorId}/${id}`, true)
    await db.write(`edges/home_poll/${id}`, true) // TODO: filter the private polls
  }
  catch(err) {
    return Promise.reject(err)
  }
  finally {
    return db.read(`polls/${id}`)
  }
}
