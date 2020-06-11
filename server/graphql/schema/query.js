const deleteme = `

user(id: ID!): User

users: [User!]

poll(id: ID!): LivePoll

polls: [LivePoll!]

`

const db = require('../../functions/realtimeDb')

const {
  GraphQLObjectType, 
  GraphQLInputObjectType,
  GraphQLNonNull, 
  GraphQLID, 
  GraphQLString,
  GraphQLList
} = require('graphql')

const {User} = require('./types/user')

module.exports = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: User,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID)
        }
      },
      resolve(_, args) {
        return db.read(`users/${args.id}`)
      }
    },

    users: {
      type: new GraphQLList(new GraphQLNonNull(User)),
      async resolve() {
        const users = await db.readAsList('users')
        return users.map(user => Promise.resolve(user))
      }
    }
  }
})