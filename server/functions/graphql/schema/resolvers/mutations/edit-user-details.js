const db = require('../../../../realtimeDb')

module.exports = async function editUserDetails(_, args, context) {
  const id = await context.getAuthUserId()
  const {newDetails} = args

  try {
    await db.write(`users/${id}`, {...newDetails, id})
  }
  catch(err) {
    return Promise.reject(err)
  }
  finally {
    return db.read(`users/${id}`)
  }
}
