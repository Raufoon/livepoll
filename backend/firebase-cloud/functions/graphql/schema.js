const { gql } = require('apollo-server-express');

const livepollSchema = require('./schemas/livepoll');
const userSchema = require('./schemas/user');

const typeDefs = gql`
  ${userSchema.definitions}
  ${livepollSchema.definitions}

  type Query {
    ${userSchema.queries}
    ${livepollSchema.queries}
  }

  type Mutation {
    ${userSchema.mutations}
    ${livepollSchema.mutations}
  }
`;

module.exports = typeDefs;