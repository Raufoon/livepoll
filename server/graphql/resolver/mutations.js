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

  try {
    await Promise.all([
      db.write(`polls/${id}`, {...newPoll, id}),
      db.write(`users/${author}/ownPolls/${id}`, id)
    ])
  }
  catch(err) {
    await Promise.all([
      db.remove(`polls/${id}`),
      db.remove(`users/${author}/ownPolls/${id}`)
    ])
    return Promise.reject(500)
  }
  finally {
    const values = await Promise.all([
      db.read(`polls/${id}`),
      db.read(`users/${author}`)
    ])
    return Promise.resolve({...values[0], author: values[1]})
  }
}

module.exports = {
  createUser: createUser,
  createLivePoll: createLivePoll
}