const definitions = `
  type User {
    id: ID!
    name: String
    dob: String
    votedPolls: [String]
  }
`;

const queries = `
  user(id: ID!): User
  users: [User]!
  haveIVoted(pollId: String!): String
`;

const mutations = `
  createUser(id: ID!, name: String, dob: String): User
`;

module.exports = {
  definitions,
  queries,
  mutations,
};