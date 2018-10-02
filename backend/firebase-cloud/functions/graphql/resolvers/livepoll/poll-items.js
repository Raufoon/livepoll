const DB = require("../../../firebase-database/realtime-database");
const {verifyIdToken, decodeIdToken} = require('../util');

module.exports.addItem = (_, { pollId, content }, context) => {
  return DB.read(`/polls/${pollId}/settings/othersCanAdd`)
    .then(
      // if only creator can add, verify the creator
      (othersCanAdd) => {
        if (othersCanAdd) return Promise.resolve(othersCanAdd);
        if (!othersCanAdd) {
          return DB.read(`/polls/${pollId}/settings/creatorId`)
            .then(creatorId => verifyIdToken(context.idToken, creatorId))
            .then(() => othersCanAdd)
        }
      }
    )
    .then(
      // check if the item format is correct
      (othersCanAdd) => DB.read(`/polls/${pollId}/settings/itemFormat`)
        .then(
          (pollItemFormat) => {
            switch (pollItemFormat) {
              case 'T':
                if (Object.values(content).length === 1 && typeof content.text === 'string') {
                  return Promise.resolve(othersCanAdd);
                }
                break;
              default:
            }
            return Promise.reject(500);
          }
        )
        .then(
          // if anyone can add item, find the item creator id
          (othersCanAdd) => {
            if (othersCanAdd) {
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
              voteCount: 0,
              voterIds: [],
            };
            if (args.creatorId) newItem.creatorId = args.creatorId;
            return DB.write(`/itemList/${pollId}/${itemId}`, newItem);
          }
        )
    );
};

module.exports.items = (livepoll, {id, startAt, howMany}) => {
  if (id) {
    return DB.read(`/itemList/${livepoll.id}/${id}`).then(item => [item]);
  } else if (startAt !== undefined || howMany !== undefined) {
    return DB.readWithinRange(`/itemList/${livepoll.id}`, startAt, howMany, 'voteCount');
  }
};