const {GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLList} = require('graphql')
const db = require('../../realtimeDb')
const {User} = require('./types/user')
const {LivePoll, UsagePrivacy} = require('./types/livepoll')

module.exports = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {

    user: {
      type: User,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(_, args) {
        const {id} = args
        return db.read(`users/${id}`)
      }
    },

    users: {
      type: new GraphQLList(new GraphQLNonNull(User)),
      async resolve() {
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
    },

    poll: {
      type: LivePoll,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve(_, args) {
        const {id} = args
        return db.read(`polls/${id}`)
      }
    },

    home: {
      type: new GraphQLList(new GraphQLNonNull(LivePoll)),
      async resolve() {
        let pollIds;

        try {
          pollIds = await db.readAsList('edges/home_poll')
        }
        catch(err){
          return Promise.reject(err)
        }
        finally{
          return pollIds.map(id => db.read(`polls/${id}`))
        }
      }
    },

    polls: {
      type: new GraphQLList(new GraphQLNonNull(LivePoll)),
      async resolve() {
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
    },
  }
})