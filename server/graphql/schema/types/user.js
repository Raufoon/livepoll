const {
  GraphQLObjectType, 
  GraphQLInputObjectType,
  GraphQLNonNull, 
  GraphQLID, 
  GraphQLString,
  GraphQLList
} = require('graphql')

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
        type: new GraphQLList(new GraphQLNonNull(LivePoll))
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