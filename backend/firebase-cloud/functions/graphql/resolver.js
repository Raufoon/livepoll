const DB = require('../firebase-database/realtime-database');

const resolvers = {
  User: {
    name: obj => obj.name,
    dob: obj => obj.dob,
  },
  Query: {
    user: (_, { id }) => DB.read(`/users/${id}`),
    users: () => DB.readList('/users'),
  }
};

module.exports = resolvers;