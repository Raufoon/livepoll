const DB = require("../../firebase-database/realtime-database");

const definitions = {
  BasicInfo: {
    name: obj => obj.name,
    dob: obj => obj.dob,
  },
  User: {
    basicInfo: obj => obj.basicInfo,
    votedPolls: user => {
      return DB.read(`myVotedPolls/${user.id}`).then(val => Object.keys(val));
    },
    myPolls: user => {
      return DB.read(`myPolls/${user.id}`).then(val => Object.keys(val));
    },
  },
};

const queries = {
  user: (_, { id }) => DB.read(`/users/${id}`),
  users: () => DB.readList('/users'),
  haveIVoted: require('./user/user').haveIVoted,
};

const mutations = {
  createUser: require('./user/user').createUser,
  updateProfileBasicInfo: require('./user/user').updateProfileBasicInfo,
};

module.exports = {
  definitions,
  queries,
  mutations
};