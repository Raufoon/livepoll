const {
  GraphQLObjectType, 
  GraphQLInputObjectType,
  GraphQLNonNull, 
  GraphQLID, 
  GraphQLString,
  GraphQLList
} = require('graphql')

const db = require('../../../functions/realtimeDb')

exports.User = new GraphQLObjectType({
  name: 'User', 
  fields: function() {
    const {LivePoll} = require('./livepoll')
    return {
      id: {
        type: GraphQLID
      },
      name: {
        type: GraphQLString
      },
      dob: {
        type: GraphQLString
      },
      ownPolls: {
        type: new GraphQLList(new GraphQLNonNull(LivePoll)),
        resolve(obj) {
          return Object.values(obj.ownPolls || {}).map(pollId => db.read(`polls/${pollId}`))
        }
      },
      participations: {
        type: new GraphQLList(new GraphQLNonNull(LivePoll))
      }
    }
  }
})

exports.UserInput = new GraphQLInputObjectType({
  name: 'UserInput',
  fields: function() {
    return {
      name: GraphQLString,
      dob: GraphQLString
    }
  }
})