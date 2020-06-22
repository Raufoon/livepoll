const db = require('../../../realtimeDb')
const {
  GraphQLObjectType, 
  GraphQLEnumType,
  GraphQLNonNull, 
  GraphQLID, 
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
  GraphQLInt
} = require('graphql')


exports.UsagePrivacy = new GraphQLEnumType({
  name: 'UsagePrivacy',
  values: {
    PUBLIC: {value: 1},
    PROTECTED: {value: 2},
    PRIVATE: {value: 3}
  }
})

exports.AdditionRestriction = new GraphQLEnumType({
  name: 'AdditionRestriction',
  values: {
    BEFORE_START: {value: 1},
    ALWAYS: {value: 2}
  }
})

exports.VotingSystem = new GraphQLEnumType({
  name: 'VotingSystem',
  values: {
    TICK_ONE: {value: 1},
    TICK_MANY: {value: 2},
    NUMBER_MANY: {value: 3}
  }
})

exports.ItemContentType = new GraphQLEnumType({
  name: 'ItemContentType',
  values: {
    TEXT: {value: 1},
    AVATAR_TEXT: {value: 2},
    IMAGE_CAPTION: {value: 3},
    IMAGE_ONLY: {value: 4}
  }
})

exports.LivePoll = new GraphQLObjectType({
  name: 'LivePoll',
  fields: function() {
    const {User} = require('./user')
    const {Item} = require('./item')

    return {
      id: {type: GraphQLID},
      title: {type: GraphQLString},
      startDateTime: {type: new GraphQLNonNull(GraphQLString)},
      endDateTime: {type: GraphQLString},
      
      author: {
        type: User,
        resolve(obj) {
          const authorId = obj.author
          return db.read(`users/${authorId}`)
        }
      },
      
      shouldShowVoters: {type: GraphQLBoolean},
      usagePrivacy: {type: exports.UsagePrivacy},
      whenToAddItem: {type: exports.AdditionRestriction},
      votingSystem: {type: exports.VotingSystem},
      itemContentType: {type: exports.ItemContentType},
      totalVotes: {type: GraphQLInt},
      
      items: {
        type: new GraphQLList(new GraphQLNonNull(Item)),
        async resolve(obj) {
          const pollId = obj.id
          let itemIdsWithVote, myItemIds;

          try {
            itemIdsWithVote = await db.read(`edges/poll_item/${pollId}`, {sortByValue: true})
            myItemIds = Object.keys(itemIdsWithVote || {})
          }
          catch(err) {
            return Promise.reject(err)
          }
          finally {
            return myItemIds.map(id => db.read(`items/${id}`))
          }
        }
      }
    }
  }
})

exports.LivePollInput = new GraphQLInputObjectType({
  name: 'LivePollInput',
  fields: function() {
    return {
      title: {type: GraphQLString},
      startDateTime: {type: new GraphQLNonNull(GraphQLString)},
      endDateTime: {type: GraphQLString},
      author: {type: GraphQLID},
      shouldShowVoters: {type: GraphQLBoolean},
      usagePrivacy: {type: exports.UsagePrivacy},
      whenToAddItem: {type: exports.AdditionRestriction},
      votingSystem: {type: exports.VotingSystem},
      itemContentType: {type: exports.ItemContentType},
    }
  }
})

