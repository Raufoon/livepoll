const DB = require("../../firebase-database/realtime-database");
const {verifyIdToken} = require('./util');
const uuidv1 = require('uuid/v1');

const definitions = {
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
    items: obj => obj.items,
  },

  LivepollItem: {
    id: obj => obj.id,
    creatorId: obj => obj.creatorId,
    content: obj => obj.content,
  },

  LivepollItemContent: {
    __resolveType: (obj, context, info) => {
      if (obj.imgUrl) {
        return 'TextImageContent';
      } else if (obj.imgUrlList) {
        return 'TextImageListContent';
      } else if (obj.youtubeUrl) {
        return 'TextVideoContent';
      } else {
        return 'TextContent';
      }
    },
    text: obj => obj.text,
  },

  TextContent: {
    text: obj => obj.text,
  },

  TextImageContent: {
    text: obj => obj.text,
    imgUrl: obj => obj.imgUrl,
  },

  TextImageListContent: {
    text: obj => obj.text,
    imgUrlList: obj => obj.imgUrlList,
  },

  TextVideoContent: {
    text: obj => obj.text,
    youtubeUrl: obj => obj.youtubeUrl,
  }
};

const queries = {
  livepoll: (_, { id }) => DB.read(`/polls/${id}`),
};

const mutations = {

  publishLivepoll: (_, { settings }, context) => {
    const newPollId = uuidv1();
    return verifyIdToken(context.idToken, settings.creatorId)
      .then(
        () => DB.write(`/polls/${newPollId}`, {
          id: newPollId,
          settings
        })
      );
  },
  addItem: require('./livepoll/poll-items').addItem
};

module.exports = {
  definitions,
  queries,
  mutations
};