const { gql } = require('apollo-server-express');

const dataDefSchema = `
  type User {
    id: ID!
    name: String
    dob: String
  }
`;

const querySchema = `
  type Query {
    user(id: ID!): User
    users: [User]!
  }
`;

const typeDefs = gql`
  ${dataDefSchema}
  ${querySchema}
`;

module.exports = typeDefs;
module.exports.querySchema = querySchema;
module.exports.dataDefSchema = dataDefSchema;