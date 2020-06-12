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
        
        async resolve(obj) {
          const myId = obj.id

          try {
            const edgesWithMe = await db.read(`edges/${myId}`)

            const myPollIds = Object.keys(edgesWithMe || {})
              .filter(key => edgesWithMe[key] === 'c-p')
            
            return myPollIds.map(id => db.read(`polls/${id}`))
          }
          catch(err) {
            return Promise.reject(err)
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
    name: {
      type: GraphQLString
    },
    dob: {
      type: GraphQLString
    }
  }
})