const db = require('../../../../realtimeDb')

module.exports = async function polls(_, args) {
  let polls;
  try {
    polls = await db.readAsList('polls')
  } 
  catch (err) {
    return Promise.reject(err)
  }
  finally {
    return polls.map(poll => Promise.resolve(poll))
  }
}
