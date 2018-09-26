const DB = require("../../firebase-database/realtime-database");
const {verifyIdToken} = require('./util');

const definitions = {
  User: {
    name: obj => obj.name,
    dob: obj => obj.dob,
    votedPolls: obj => Object.keys(obj.votedPolls || {}),
  },
};

const queries = {
  user: (_, { id }) => DB.read(`/users/${id}`),
  users: () => DB.readList('/users'),
  haveIVoted: require('./user/user').haveIVoted,
};

const mutations = {
  createUser: (_, { id, name, dob }, context) => {
    return verifyIdToken(context.idToken, id)
      .then(() => DB.write(`/users/${id}`, {
        id,
        name,
        dob
      }));
  },
};

module.exports = {
  definitions,
  queries,
  mutations
};