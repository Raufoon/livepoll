const DB = require("../../../firebase-database/realtime-database");
const {verifyIdToken, decodeIdToken} = require('../util');
const uuidv1 = require('uuid/v1');

module.exports.addItem = (_, { pollId, content }, context) => {
  return DB.read(`/polls/${pollId}/settings/whoCanAddItem`)
    .then(
      // if only creator can add, verify the creator
      (whoCanAdd) => {
        if (whoCanAdd === 'A') return Promise.resolve(whoCanAdd);
        if (whoCanAdd === 'C') {
          return DB.read(`/polls/${pollId}/settings/creatorId`)
            .then(creatorId => verifyIdToken(context.idToken, creatorId))
            .then(() => whoCanAdd)
        }
      }
    )
    .then(
      // check if the item format is correct
      (whoCanAdd) => DB.read(`/polls/${pollId}/settings/itemFormat`)
        .then(
          (pollItemFormat) => {
            switch (pollItemFormat) {
              case 'T':
                if (Object.values(content).length === 1 && typeof content.text === 'string') {
                  return Promise.resolve(whoCanAdd);
                }
                break;
              default:
            }
            return Promise.reject(500);
          }
        )
        .then(
          // if anyone can add item, find the item creator id
          (whoCanAdd) => {
            if (whoCanAdd === 'A') {
              return decodeIdToken(context.idToken)
                .then(authUid => ({creatorId: authUid}));
            }
            return Promise.resolve({});
          }
        )
        .then(
          // write to database
          (args) => {
            const itemId = DB.getPushKey();
            const newItem = {
              id: itemId,
              content,
            };
            if (args.creatorId) newItem.creatorId = args.creatorId;
            return DB.write(`/polls/${pollId}/items/${itemId}`, newItem);
          }
        )
    );
};

module.exports.getFirstNItems = (_, { pollId, limit, lastItemId }) => {
  return DB.readWithinRange(`/polls/${pollId}/items`, limit, lastItemId);
};