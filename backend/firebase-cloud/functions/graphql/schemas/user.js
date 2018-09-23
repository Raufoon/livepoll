const definitions = `
  type User {
    id: ID!
    name: String
    dob: String
  }
`;

const queries = `
  user(id: ID!): User
  users: [User]!
`;

const mutations = `
  createUser(id: ID!, name: String, dob: String): User
`;

module.exports = {
  definitions,
  queries,
  mutations,
};