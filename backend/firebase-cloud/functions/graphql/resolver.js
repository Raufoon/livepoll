const DB = require('../firebase-database/realtime-database');
const uuidv1 = require('uuid/v1');

DB.init();

const resolvers = {
  User: {
    name: obj => obj.name,
    dob: obj => obj.dob,
  },
  Query: {
    user: (_, { id }) => DB.read(`/users/${id}`),
    users: () => DB.readList('/users'),
  },
  Mutation: {
    createUser: (_, { name, dob }) => {
      const id = uuidv1();
      return DB.write(`/users/${id}`, {
        id,
        name,
        dob
      });
    }
  }
};

module.exports = resolvers;