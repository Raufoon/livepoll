const DB = require("../../firebase-database/realtime-database");

const definitions = {
  LivepollSettings: {
    creatorId: obj => obj.creatorId,
    title: obj => obj.title,
    startDatetime: obj => obj.startDatetime,
    endDatetime: obj => obj.endDatetime,
    isPrivate: obj => obj.isPrivate,
    voteType: obj => obj.voteType,
    itemFormat: obj => obj.itemFormat,
    othersCanAdd: obj => obj.othersCanAdd,
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
  getFirstNItems: require('./livepoll/poll-items').getFirstNItems,
};

const mutations = {
  publishLivepoll: require('./livepoll/poll').publishLivepoll,
  addItem: require('./livepoll/poll-items').addItem
};

module.exports = {
  definitions,
  queries,
  mutations
};