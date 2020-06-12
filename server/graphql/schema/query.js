const db = require('../../functions/realtimeDb')

const {
  GraphQLObjectType, 
  GraphQLInputObjectType,
  GraphQLNonNull, 
  GraphQLID, 
  GraphQLString,
  GraphQLList
} = require('graphql')

const {User} = require('./types/user')
const {LivePoll} = require('./types/livepoll')

module.exports = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: User,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(_, args) {
        return db.read(`users/${args.id}`)
      }
    },

    users: {
      type: new GraphQLList(new GraphQLNonNull(User)),
      async resolve() {
        const users = await db.readAsList('users')
        return users.map(user => Promise.resolve(user))
      }
    },

    poll: {
      type: LivePoll,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(_, args) {
        return db.read(`polls/${args.id}`)
      }
    },

    polls: {
      type: new GraphQLList(new GraphQLNonNull(LivePoll)),
      async resolve() {
        const polls = await db.readAsList('polls')
        return polls.map(polls => Promise.resolve(polls))
      }
    },
  }
})