const DB = require('../firebase-database/realtime-database');
const uuidv1 = require('uuid/v1');

const resolvers = {
  User: {
    name: obj => obj.name,
    dob: obj => obj.dob,
  },

  LivepollSettings: {
    creatorId: obj => obj.creatorId,
    title: obj => obj.title,
    startDatetime: obj => obj.startDatetime,
    endDatetime: obj => obj.endDatetime,
    privacy: obj => obj.privacy,
    voteType: obj => obj.voteType,
    itemFormat: obj => obj.itemFormat,
    whoCanAddItem: obj => obj.whoCanAddItem,
  },
  Livepoll: {
    id: obj => obj.id,
    settings: obj => obj.settings,
  },
  Query: {
    user: (_, { id }) => DB.read(`/users/${id}`),
    users: () => DB.readList('/users'),
    livepoll: (_, { id }) => DB.read(`/polls/${id}`),
  },

  Mutation: {
    createUser: (_, { id, name, dob }) => {
      return DB.write(`/users/${id}`, {
        id,
        name,
        dob
      });
    },
    publishLivepoll: (_, { settings }) => {
      const id = uuidv1();
      return DB.write(`/polls/${id}`, {
        id,
        settings
      });
    }
  }
};

module.exports = resolvers;