const {GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLList} = require('graphql')
const {User} = require('./types/user')
const {LivePoll} = require('./types/livepoll')
const { Home } = require('./types/home')
const user = require('./resolvers/queries/user')
const users = require('./resolvers/queries/users')
const poll = require('./resolvers/queries/poll')
const polls = require('./resolvers/queries/polls')

module.exports = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {

    user: {
      type: User,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve: user
    },

    users: {
      type: new GraphQLList(new GraphQLNonNull(User)),
      resolve: users
    },

    poll: {
      type: LivePoll,
      args: {
        id: {type: new GraphQLNonNull(GraphQLID)}
      },
      resolve: poll
    },

    home: {
      type: new GraphQLNonNull(Home),
      resolve() {
        return Promise.resolve({})
      }
    },

    polls: {
      type: new GraphQLList(new GraphQLNonNull(LivePoll)),
      resolve: polls
    },
  }
})