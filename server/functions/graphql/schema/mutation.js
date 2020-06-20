const {GraphQLObjectType, GraphQLNonNull, GraphQLID} = require('graphql')
const {User, UserInput} = require('./types/user')
const {LivePoll, LivePollInput} = require('./types/livepoll')
const {ItemInput, Item} = require('./types/item')
const editUserDetails = require('./resolvers/mutations/edit-user-details')
const createLivePoll = require('./resolvers/mutations/create-live-poll')
const addItemToPoll = require('./resolvers/mutations/add-item-to-poll')

module.exports = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {

    editUserDetails: {
      type: User,
      args: {
        newDetails: {type: new GraphQLNonNull(UserInput)}
      },
      resolve: editUserDetails
    },

    createLivePoll: {
      type: LivePoll,
      args: {
        newPoll: {type: new GraphQLNonNull(LivePollInput)}
      },
      resolve: createLivePoll
    },

    addItemToPoll: {
      type: Item,
      args: {
        pollId: {type: GraphQLID},
        newItem: {type: new GraphQLNonNull(ItemInput)}
      },
      resolve: addItemToPoll
    }
  }
})