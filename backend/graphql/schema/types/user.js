const db = require('../../../realtimeDb')
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
      id: {type: GraphQLID},
      name: {type: GraphQLString},
      dob: {type: GraphQLString},
      avatar: {type: GraphQLString},
      
      ownPolls: {
        type: new GraphQLList(new GraphQLNonNull(LivePoll)),
        async resolve(obj) {
          const myId = obj.id
          let myPollIds;
          try {
            const edges = await db.read(`edges/${myId}`)
            myPollIds = Object.keys(edges||{}).filter(key => edges[key] === 'c-p')   
          }
          catch(err) {
            return Promise.reject(err)
          }
          finally {
            return myPollIds.map(id => db.read(`polls/${id}`))
          }
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
  fields: {
    name: {type: GraphQLString},
    dob: {type: GraphQLString}
  }
})