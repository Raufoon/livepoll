const DB = require("../../firebase-database/realtime-database");

const definitions = {
  LivepollSettings: {
    creatorId: obj => obj.creatorId,
    title: obj => obj.title,
    startDatetime: obj => obj.startDatetime,
    endDatetime: obj => obj.endDatetime,
    isPrivate: obj => obj.isPrivate,
    itemFormat: obj => obj.itemFormat,
    othersCanAdd: obj => obj.othersCanAdd,
    showVoters: obj => obj.showVoters,
  },

  Livepoll: {
    id: obj => obj.id,
    settings: obj => obj.settings,
    items: (obj, {id, startAt, howMany}) => {
      let items = Object.values(obj.items || {});
      if (id) {
        items = items.filter(item => item.id === id);
      } else if (startAt !== undefined || howMany !== undefined) {
        items = items.sort((a, b) => a.voteCount > b.voteCount ? -1 : 1);
        items = items.slice(startAt, howMany);
      }
      return items;
    }
  },

  LivepollItem: {
    id: obj => obj.id,
    creatorId: obj => obj.creatorId,
    content: obj => obj.content,
    voteCount: obj => obj.voteCount,
    voterIds: obj => Object.keys(obj.voterIds || {}),
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
  livepoll: require('./livepoll/poll').getLivepoll,
  getTopItems: require('./livepoll/poll-items').getTopItems,
  getTrendingPolls: require('./livepoll/poll-items').getTrendingPolls,
  getMostPopularPolls: require('./livepoll/poll-items').getMostPopularPolls,
  getRecentPolls: require('./livepoll/poll-items').getRecentPolls,
};

const mutations = {
  publishLivepoll: require('./livepoll/poll').publishLivepoll,
  addItem: require('./livepoll/poll-items').addItem,
  vote: require('./livepoll/poll').vote,
};

module.exports = {
  definitions,
  queries,
  mutations
};