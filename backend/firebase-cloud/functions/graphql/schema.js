const { gql } = require('apollo-server-express');

const schema = `
  type User {
    id: ID!
    name: String
    dob: String
  }
  type Query {
    user(id: ID!): User
    users: [User]!
  }
`;

const typeDefs = gql`${schema}`;

module.exports = typeDefs;
module.exports.schema = schema;