const {GraphQLObjectType, GraphQLNonNull, GraphQLID, GraphQLInt, GraphQLList, GraphQLBoolean} = require('graphql')
const {User, UserInput} = require('./types/user')
const {LivePoll, LivePollInput} = require('./types/livepoll')
const {ItemInput, Item} = require('./types/item')
const editUserDetails = require('./resolvers/mutations/edit-user-details')
const createLivePoll = require('./resolvers/mutations/create-live-poll')
const addItemToPoll = require('./resolvers/mutations/add-item-to-poll')
const vote = require('./resolvers/mutations/vote')
const unvote = require('./resolvers/mutations/unvote')
const deletePoll = require('./resolvers/mutations/delete-poll')

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
    },

    vote: {
      type: new GraphQLList(Item),
      args: {
        pollId: {type: GraphQLID},
        itemId: {type: GraphQLID},
        voteValue: {type: GraphQLInt}
      },
      resolve: vote
    },

    unvote: {
      type: Item,
      args: {
        pollId: {type: GraphQLID},
        itemId: {type: GraphQLID},
        voteValue: {type: GraphQLInt}
      },
      resolve: unvote
    },

    deletePoll: {
      type: GraphQLBoolean,
      args: {
        pollId: {type: GraphQLID}
      },
      resolve: deletePoll
    }
  }
})