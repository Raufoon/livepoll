const DB = require("../../firebase-database/realtime-database");

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
    content: obj => obj.content,
  },
  LivepollItemContent: {
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
  publishLivepoll: (_, { settings }) => {
    const id = uuidv1();
    return DB.write(`/polls/${id}`, {
      id,
      settings
    });
  }
};

module.exports = {
  definitions,
  queries,
  mutations
};