const db = require('../../../realtimeDb')
const {
  GraphQLObjectType,
  GraphQLInputObjectType, 
  GraphQLInt,
  GraphQLNonNull, 
  GraphQLID, 
  GraphQLString,
  GraphQLList
} = require('graphql')


exports.Home = new GraphQLObjectType({
  name: 'Home',
  fields: function() {
    const {LivePoll} = require('./livepoll')
    return {
      recentPolls: {
        type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(LivePoll))),
        async resolve() {
          let recentPollIds;
          
          try {
            recentPollIds = await db.readKeysAsList('edges/home_poll')
          }
          catch(err) {
            return Promise.reject(err)
          }
          finally {
            return recentPollIds.map(pollId => db.read(`/polls/${pollId}`))
          }
        }
      }
    }
  }
})