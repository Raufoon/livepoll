const userResolvers = require('./resolvers/user-resolvers');
const livepollResolvers = require('./resolvers/livepoll-resolvers');

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