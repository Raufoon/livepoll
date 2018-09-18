const { gql } = require('apollo-server-express');
const typeDefs = gql`
  type User {
    id: ID!
    name: String
    dob: String
  }
  type Query {
    user(id: ID!): User
    users: [User]!
  }
  type Mutation {
    createUser(authToken: String!, name: String, dob: String): User
  }
`;
module.exports = typeDefs;