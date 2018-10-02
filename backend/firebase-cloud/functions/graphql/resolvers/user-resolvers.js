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
  users: (parent, {idList}) => {
    return DB.read('/users')
      .then(response => {
        let userList = [];
        if (idList) {
          for (let i=0; i<idList.length; i++) {
            userList.push(response[idList[i]])
          }
        } else {
          userList = Object.values(response);
        }
        return userList;
      });
  },
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