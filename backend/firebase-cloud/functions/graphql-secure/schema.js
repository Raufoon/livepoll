const { gql } = require('apollo-server-express');
const {dataDefSchema, querySchema} = require('../graphql/schema');

const typeDefs = gql`
  ${dataDefSchema}
  ${querySchema}
  type Mutation {
    createUser(id: ID!, name: String, dob: String): User
  }
`;
module.exports = typeDefs;