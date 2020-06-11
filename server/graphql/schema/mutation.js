var deleteme = `

createUser(newUser: UserInput!): User

createLivePoll(newPoll: LivePollInput!): LivePoll

addItemToPoll(pollId: ID!, newItem: ItemInput!): Item

`


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
  name: 'RootMutationType',
  fields: {
  }
})