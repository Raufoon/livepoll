const { gql } = require('apollo-server-express');
const dataDefSchema = require('../graphql/shared/data-def-schema');
const typeDefs = gql`
  ${dataDefSchema}
  type Query {
    user(id: ID!): User
    users: [User]!
  }
  type Mutation {
    createUser(id: ID!, name: String, dob: String): User
  }
`;
module.exports = typeDefs;