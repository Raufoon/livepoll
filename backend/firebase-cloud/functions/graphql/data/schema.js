const graphqlTools = require('graphql-tools');

const resolvers = require('./resolvers');

const schema = `
# data models
type User {
  id: String!
  name: String
}

#query
type Query {
  users: [User]
  user(id: String!): User
}

#mutations
type Mutation {
  createUser(name: String): User
}
`;

module.exports = graphqlTools.makeExecutableSchema({
  typeDefs: schema,
  resolvers
});