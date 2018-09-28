const DB = require("../../firebase-database/realtime-database");

const definitions = {
  BasicInfo: {
    name: obj => obj.name,
    dob: obj => obj.dob,
  },
  User: {
    basicInfo: obj => obj.basicInfo,
    votedPolls: obj => Object.keys(obj.votedPolls || {}),
    myPolls: obj => Object.keys(obj.myPolls || {}),
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