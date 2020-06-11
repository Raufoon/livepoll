module.exports = `

createUser(newUser: UserInput!): User

createLivePoll(newPoll: LivePollInput!): LivePoll

addItemToPoll(pollId: ID!, newItem: ItemInput!): Item

`