const {GraphQLObjectType, GraphQLNonNull, GraphQLID} = require('graphql')
const db = require('../../realtimeDb')
const {User, UserInput} = require('./types/user')
const {LivePoll, LivePollInput, UsagePrivacy} = require('./types/livepoll')
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
    },

    createLivePoll: {
      type: LivePoll,
      args: {
        newPoll: {type: new GraphQLNonNull(LivePollInput)}
      },
      async resolve(_, args, context) {
        const id = db.getNewID()
        const {newPoll} = args

        try {
          const authorId = await context.getAuthUserId()
          await db.write(`polls/${id}`, {...newPoll, id, author: authorId})
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
    },

    addItemToPoll: {
      type: Item,
      args: {
        pollId: {type: GraphQLID},
        newItem: {type: new GraphQLNonNull(ItemInput)}
      },
      async resolve(_, args, context) {
        const id = db.getNewID()
        const {pollId, newItem} = args

        try {
          const itemCreatorId = await context.getAuthUserId()
          const pollUsagePrivacy = await db.read(`/poll/${pollId}/usagePrivacy`)
          
          if (pollUsagePrivacy === UsagePrivacy.getValue('PROTECTED')) {
            const pollCreatorId = await db.read(`/poll/${pollId}/author`)
            
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
    }
  }
})