const db = require('../../functions/realtimeDb')

async function createUser(args) {
  const {newUser} = args
  const id = db.getNewID()
  
  try {
    await db.write(`users/${id}`, {...newUser, id}) 
  }
  catch(err) {
    return Promise.reject(500)
  }
  finally {
    return db.read(`users/${id}`)
  }
}

async function createLivePoll(args) {
  const {newPoll} = args
  const {author} = newPoll
  const id = db.getNewID()
  let createdPoll, creator;

  try {
    await db.write(`polls/${id}`, {...newPoll, id})
    await db.write(`users/${author}/ownPolls/${id}`, id)
    createdPoll = await db.read(`polls/${id}`)
    creator = await db.read(`users/${author}`)
  }
  catch(err) {
    await db.remove(`polls/${id}`)
    await db.remove(`users/${author}/ownPolls/${id}`)
    return Promise.reject(500)
  }
  finally {
    return Promise.resolve({
      ...createdPoll, 
      author: creator
    })
  }
}

module.exports = {
  createUser: createUser,
  createLivePoll: createLivePoll
}