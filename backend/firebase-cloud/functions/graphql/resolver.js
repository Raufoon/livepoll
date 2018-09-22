const DB = require('../firebase-database/realtime-database');
const uuidv1 = require('uuid/v1');

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