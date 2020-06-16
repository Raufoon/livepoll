const db = require('../../../realtimeDb')
const {
  GraphQLObjectType, 
  GraphQLEnumType,
  GraphQLNonNull, 
  GraphQLID, 
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean
} = require('graphql')


exports.Privacy = new GraphQLEnumType({
  name: 'Privacy',
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

exports.Capacity = new GraphQLEnumType({
  name: 'Capacity',
  values: {
    A_VS_B: {value: 1},
    SMALL: {value: 2},
    LARGE: {value: 3}
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
      privacy: {type: exports.Privacy},
      whenToAddItem: {type: exports.AdditionRestriction},
      votingSystem: {type: exports.VotingSystem},
      itemContentType: {type: exports.ItemContentType},
      capacity: {type: exports.Capacity},
      
      items: {
        type: new GraphQLList(new GraphQLNonNull(Item)),
        async resolve(obj) {
          const pollId = obj.id
          let myItemIds;
          try {
            const edges = await db.read(`edges/${pollId}`)
            myItemIds = Object.keys(edges||{}).filter(key => edges[key] === 'p-i')
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
      privacy: {type: exports.Privacy},
      whenToAddItem: {type: exports.AdditionRestriction},
      votingSystem: {type: exports.VotingSystem},
      itemContentType: {type: exports.ItemContentType},
      capacity: {type: exports.Capacity}
    }
  }
})

