const DB = require("../../firebase-database/realtime-database");

const definitions = {
  User: {
    name: obj => obj.name,
    dob: obj => obj.dob,
  },
};

const queries = {
  user: (_, { id }) => DB.read(`/users/${id}`),
  users: () => DB.readList('/users'),
};

const mutations = {
  createUser: (_, { id, name, dob }) => {
    return DB.write(`/users/${id}`, {
      id,
      name,
      dob
    });
  },
};

module.exports = {
  definitions,
  queries,
  mutations
};