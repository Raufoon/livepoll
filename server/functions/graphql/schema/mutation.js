const {GraphQLObjectType, GraphQLNonNull, GraphQLID} = require('graphql')
const db = require('../../realtimeDb')
const {User, UserInput} = require('./types/user')
const {LivePoll, LivePollInput} = require('./types/livepoll')
const {ItemInput, Item} = require('./types/item')

module.exports = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {

    editUserDetails: {
      type: User,
      args: {
        newDetails: {type: new GraphQLNonNull(UserInput)}
      },
      async resolve(_, args, context) {
        const {getAuthUserId} = context
        const id = await getAuthUserId()
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
    },

    createLivePoll: {
      type: LivePoll,
      args: {
        newPoll: {type: new GraphQLNonNull(LivePollInput)}
      },
      async resolve(_, args, context) {
        const id = db.getNewID()
        const {newPoll} = args
        const {getAuthUserId} = context
        const author = await getAuthUserId()

        try {
          await db.write(`polls/${id}`, {...newPoll, id})
          await db.write(`edges/author_poll/${author}/${id}`, true)
        }
        catch(err) {
          return Promise.reject(err)
        }
        finally {
          return db.read(`polls/${id}`)
        }
      }
    },

    addItemToPoll: {
      type: Item,
      args: {
        pollId: {type: GraphQLID},
        newItem: {type: new GraphQLNonNull(ItemInput)}
      },
      async resolve(_, args) {
        const id = db.getNewID()
        const {pollId, newItem} = args

        try {
          await db.write(`items/${id}`, {...newItem, id})
          await db.write(`edges/p_i/${pollId}/${id}`, 0)
        }
        catch(err) {
          return Promise.reject(err)
        }
        finally {
          return db.read(`items/${id}`)
        }
      }
    }
  }
})