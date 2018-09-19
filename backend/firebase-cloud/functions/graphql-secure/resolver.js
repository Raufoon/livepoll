const DB = require('../firebase-database/realtime-database');
const commonResolvers = require('../graphql/resolver');

const resolvers = Object.assign({}, commonResolvers, {
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