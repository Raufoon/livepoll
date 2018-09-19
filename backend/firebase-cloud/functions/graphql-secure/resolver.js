const DB = require('../firebase-database/realtime-database');
const commonResolvers = require('../graphql/shared/common-resolvers');

const resolvers = Object.assign({}, commonResolvers, {
  Query: {
    user: (_, { id }) => DB.read(`/users/${id}`),
    users: () => DB.readList('/users'),
  },
  Mutation: {
    createUser: (_, { id, name, dob }) => {
      return DB.write(`/users/${id}`, {
        id,
        name,
        dob
      });
    }
  }
});

module.exports = resolvers;