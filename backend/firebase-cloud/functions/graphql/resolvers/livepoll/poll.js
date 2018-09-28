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

  let decreaseVote = itemId => DB.doTransaction(`polls/${pollId}/items/${itemId}/voteCount`, voteCount => {
    if (voteCount !== null) {
      return voteCount - 1
    }
    return voteCount;
  });

  let increaseVote = itemId => DB.doTransaction(`polls/${pollId}/items/${itemId}/voteCount`, voteCount => {
    if (voteCount !== null) {
      return voteCount + 1
    }
    return voteCount;
  });

  let unsaveVote = (itemId) => Promise.all([
    DB.remove(`polls/${pollId}/items/${itemId}/voterIds/${authUserId}`)
  ]);

  let saveVote = (itemId) => Promise.all([
    DB.write(`users/${authUserId}/votedPolls/${pollId}`, itemId),
    DB.write(`polls/${pollId}/items/${itemId}/voterIds/${authUserId}`, true)
  ]);

  return fetchLastVotedItemId()
    .then(lastVotedItemId => {
      if (!lastVotedItemId) {
        return increaseVote(votedItemId)
          .then(() => saveVote(votedItemId));
      } else if (lastVotedItemId === votedItemId) {
        return decreaseVote(votedItemId)
          .then(() => DB.remove(`users/${authUserId}/votedPolls/${pollId}`))
          .then(() => unsaveVote(votedItemId));
      } else {
        return Promise.all([
          decreaseVote(lastVotedItemId).then(() => unsaveVote(lastVotedItemId)),
          increaseVote(votedItemId).then(() => saveVote(lastVotedItemId))
        ]);
      }
    })
    .then(() => DB.read(`polls/${pollId}/items/${votedItemId}/voteCount`));
};