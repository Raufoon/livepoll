const db = require('../../functions/realtimeDb')

function user(args) {
  const {id} = args
  return db.read(`users/${id}`)
}

function users() {
  return db.readAsList('users')
}

async function poll(args) {
  const {id} = args

  let poll, author;

  try {
    poll = await db.read(`polls/${id}`)
    author = await db.read(`users/${poll.author}`)
  }
  catch(err) {
    return Promise.reject(500)
  }
  finally {
    return Promise.resolve({
      ...poll,
      author
    })
  }
}

function polls() {
  return db.readAsList('polls')
}

module.exports = {
  user,
  users,
  poll,
  polls
}