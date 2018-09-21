const DB = require('../firebase-database/realtime-database');
const uuidv1 = require('uuid/v1');

const resolvers = {
  User: {
    name: obj => obj.name,
    dob: obj => obj.dob,
  },
  PollPrivacy: {
    public: 'pb',
    private: 'pr',
  },
  PollItemFormat: {
    text: 't',
    textWithImage: 'ti',
    textWithImages: 'ti8',
    textWithVideo: 'tv',
  },
  VoteType: {
    tickVote: 't',
    numberVote010: 'n10',
    numberVote0100: 'n100',
  },
  WhoCanAddItem: {
    anyone: 'a',
    onlyCreator: 'c',
  },
  LivepollSettings: {
    title: obj => obj.title,
    startDatetime: obj => obj.startDatetime,
    endDatetime: obj => obj.endDatetime,
    privacy: obj => obj.privacy,
    voteType: obj => obj.voteType,
    format: obj => obj.format,
    whoCanAddItem: obj => obj.whoCanAddItem,
  },
  Livepoll: {
    id: obj => obj.id,
    settings: obj => obj.settings,
  },

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