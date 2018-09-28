const {verifyIdToken, decodeIdToken} = require('../util');
const DB = require("../../../firebase-database/realtime-database");

module.exports.publishLivepoll = (_, { settings }, context) => {
  const newPollId = DB.getPushKey();
  return verifyIdToken(context.idToken, settings.creatorId)
    .then(() => DB.write(`/users/${settings.creatorId}/mypolls/${newPollId}`, true))
    .then(() => DB.write(`/polls/${newPollId}`, {
      id: newPollId,
      settings
    }));
};

// target: ensure if they are transaction
module.exports.vote = (_, { pollId, votedItemId }, context) => {
  let authUserId;

  let fetchLastVotedItemId = () => decodeIdToken(context.idToken).then(decodedUid => {
    authUserId = decodedUid;
    return DB.read(`users/${authUserId}/votedPolls/${pollId}`);
  });

  let cancelVote = (itemId) => new Promise((resolve, reject) => {
    let onSuccess = () => {
      Promise.all([
        DB.remove(`users/${authUserId}/votedPolls/${pollId}`),
        DB.remove(`polls/${pollId}/items/${itemId}/voterIds/${authUserId}`)
      ]).then(resolve).catch(reject);
    };
    let onError = reject;

    DB.doTransaction(`polls/${pollId}/items/${itemId}/voteCount`, voteCount => {
      return voteCount - 1;
    }, onSuccess, onError);
  });

  let doVote = (itemId) => new Promise((resolve, reject) => {
    let onSuccess = () => {
      Promise.all([
        DB.write(`users/${authUserId}/votedPolls/${pollId}`, itemId),
        DB.write(`polls/${pollId}/items/${itemId}/voterIds/${authUserId}`, true)
      ]).then(resolve).catch(reject);
    };
    let onError = reject;

    DB.doTransaction(`polls/${pollId}/items/${itemId}/voteCount`, voteCount => {
      return voteCount + 1;
    }, onSuccess, onError);
  });

  return fetchLastVotedItemId()
    .then(lastVotedItemId => {
      if (!lastVotedItemId) {
        // first vote
        return doVote(votedItemId);
      } else if (lastVotedItemId === votedItemId) {
        // cancel vote
        return cancelVote(votedItemId);
      } else {
        // change vote
        return Promise.all([
          cancelVote(lastVotedItemId),
          doVote(votedItemId)
        ]);
      }
    });

};