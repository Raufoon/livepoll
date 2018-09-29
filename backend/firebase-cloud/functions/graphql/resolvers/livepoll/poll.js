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

module.exports.vote = (_, { pollId, votedItemId }, context) => {
  let authUserId;

  let isPollLive = () => {
    return Promise.all([
      DB.read(`polls/${pollId}/settings/startDatetime`),
      DB.read(`polls/${pollId}/settings/endDatetime`),
    ]).then(dates => {
      const startDatetime = dates[0];
      const endDatetime = dates[1];
      const start = new Date(startDatetime);
      const end = new Date(endDatetime);
      const now = new Date();
      const endTimeExists = !!endDatetime;
      const willStartOnFuture = now < start;
      const hasEnded = endTimeExists && now >= end;
      const isLive = !(willStartOnFuture || hasEnded);
      if (isLive) return Promise.resolve('LIVE');
      return Promise.reject('Poll is not live');
    })
  };

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

  return isPollLive()
    .then(fetchLastVotedItemId)
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
          increaseVote(votedItemId).then(() => saveVote(votedItemId))
        ]);
      }
    })
    .then(() => DB.read(`polls/${pollId}/items/${votedItemId}/voteCount`));
};