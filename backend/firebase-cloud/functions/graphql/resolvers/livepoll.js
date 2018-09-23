const DB = require("../../firebase-database/realtime-database");
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
  publishLivepoll: (_, { settings }) => {
    const id = uuidv1();
    return DB.write(`/polls/${id}`, {
      id,
      settings
    });
  },
  addItem: (_, { pollId, content }) => {
    return DB.read(`/polls/${pollId}/settings/itemFormat`)
      .then((pollItemFormat) => {
        switch (pollItemFormat) {
          case 'T':
            if (Object.values(content).length === 1 && typeof content.text === 'string') {
              return Promise.resolve(1);
            }
            break;
          default:
        }
        return Promise.reject(500);
      })
      .then(() => {
        const itemId = uuidv1();
        return DB.write(`/polls/${pollId}/items/${itemId}`, {
          id: itemId,
          content,
        });
      });
  }
};

module.exports = {
  definitions,
  queries,
  mutations
};