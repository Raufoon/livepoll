const {verifyIdToken, decodeIdToken} = require('../util');
const DB = require("../../../firebase-database/realtime-database");

module.exports.publishLivepoll = (_, { settings }, context) => {
  const newPollId = DB.getPushKey();
  return verifyIdToken(context.idToken, settings.creatorId)
    .then(
      () => DB.write(`/polls/${newPollId}`, {
        id: newPollId,
        settings
      })
    );
};

module.exports.vote = (_, { pollId, itemId }, context) => {
  let itemPath = `polls/${pollId}/items/${itemId}`,
    authUserId;
  return decodeIdToken(context.idToken)
    .then(userId => {
      authUserId = userId;
      return DB.exists(`users/${authUserId}/votedPolls/${pollId}`);
    })
    .then(isAlreadyVoted => {
      if (isAlreadyVoted) return Promise.reject('You already voted');
      return Promise.resolve(true);
    })
    .then(() => DB.read(`${itemPath}/voteCount`))
    .then(voteCount => {
      return Promise.all([
        DB.write(`${itemPath}/voteCount`, voteCount + 1),
        DB.write(`users/${authUserId}/votedPolls/${pollId}`, true),
        DB.write(`${itemPath}/voterIds/${authUserId}`, true),
      ])
        .then(() => DB.read(`${itemPath}/voteCount`))
    });
};