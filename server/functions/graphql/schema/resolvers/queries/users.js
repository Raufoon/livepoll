const db = require('../../../../realtimeDb')

module.exports = async function users() {
  let users;

  try {
    users = await db.readAsList('users')
  }
  catch(err) {
    return Promise.reject(err)
  }
  finally {
    return users.map(user => Promise.resolve(user))
  }
}
