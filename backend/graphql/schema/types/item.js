const {
  GraphQLObjectType,
  GraphQLInputObjectType, 
  GraphQLInt,
  GraphQLNonNull, 
  GraphQLID, 
  GraphQLString,
  GraphQLList
} = require('graphql')


exports.Item = new GraphQLObjectType({
  name: 'Item',
  fields: function() {
    const {User} = require('./user')
    return {
      id: {type: GraphQLID},
      creatorId: {type: GraphQLID},
      text: {type: GraphQLString},
      imgUrl: {type: GraphQLString},
      score: {type: GraphQLInt},
      voters: {type: new GraphQLList(new GraphQLNonNull(User))}
    }
  }
})

exports.ItemInput = new GraphQLInputObjectType({
  name: 'ItemInput',
  fields: function() {
    return {
      id: {type: GraphQLID},
      text: {type: GraphQLString},
      imgUrl: {type: GraphQLString}
    }
  }
})