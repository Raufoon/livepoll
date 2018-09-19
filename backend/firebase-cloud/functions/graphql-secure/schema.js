const { gql } = require('apollo-server-express');
const {schema} = require('../graphql/schema');

const typeDefs = gql`
  ${schema}
  type Mutation {
    createUser(id: ID!, name: String, dob: String): User
  }
`;
module.exports = typeDefs;