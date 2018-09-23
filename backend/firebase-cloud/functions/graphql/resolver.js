const userResolvers = require('./resolvers/user');
const livepollResolvers = require('./resolvers/livepoll');

const resolvers = Object.assign(
  {},
  userResolvers.definitions,
  livepollResolvers.definitions,
  {
    Query: Object.assign(
      {},
      userResolvers.queries,
      livepollResolvers.queries
    ),
    Mutation: Object.assign(
      {},
      userResolvers.mutations,
      livepollResolvers.mutations
    )
  }
);

module.exports = resolvers;