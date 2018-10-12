const {verifyIdToken, decodeIdToken} = require('../util');
const DB = require("../../../firebase-database/realtime-database");

module.exports.getLivepoll = (_, { id }) => {
  return DB.read(`/polls/${id}`);
};

module.exports.publishLivepoll = (_, { settings }, context) => {
  const newPollId = DB.getPushKey();
  return verifyIdToken(context.idToken, settings.creatorId)
    .then(() => DB.write(`/myPolls/${settings.creatorId}/${newPollId}`, true))
    .then(() => DB.write(`/polls/${newPollId}`, {
      id: newPollId,
      settings,
      totalVotes: 0,
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
    return DB.read(`/myVotedPolls/${authUserId}/${pollId}`);
  });

  let decreaseVote = itemId => DB.doTransaction(`itemList/${pollId}/${itemId}/voteCount`, voteCount => {
    if (voteCount !== null) {
      return voteCount - 1
    }
    return voteCount;
  });

  let increaseVote = itemId => DB.doTransaction(`itemList/${pollId}/${itemId}/voteCount`, voteCount => {
    if (voteCount !== null) {
      return voteCount + 1
    }
    return voteCount;
  });

  let decreaseTotalVote = () => DB.doTransaction(`polls/${pollId}/totalVotes`, totalVotes => {
    if (totalVotes !== null) {
      return totalVotes - 1
    }
    return totalVotes;
  });

  let increaseTotalVote = () => DB.doTransaction(`polls/${pollId}/totalVotes`, totalVotes => {
    if (totalVotes !== null) {
      return totalVotes + 1
    }
    return totalVotes;
  });

  let unsaveVote = (itemId) => Promise.all([
    DB.remove(`voterList/${itemId}/${authUserId}`)
  ]);

  let saveVote = (itemId) => Promise.all([
    DB.write(`myVotedPolls/${authUserId}/${pollId}`, itemId),
    DB.write(`voterList/${itemId}/${authUserId}`, true)
  ]);

  return isPollLive()
    .then(fetchLastVotedItemId)
    .then(lastVotedItemId => {
      if (!lastVotedItemId) {
        return increaseVote(votedItemId)
          .then(() => saveVote(votedItemId))
          .then(increaseTotalVote);
      } else if (lastVotedItemId === votedItemId) {
        return decreaseVote(votedItemId)
          .then(() => DB.remove(`myVotedPolls/${authUserId}/${pollId}`))
          .then(() => unsaveVote(votedItemId))
          .then(decreaseTotalVote);
      } else {
        return Promise.all([
          decreaseVote(lastVotedItemId).then(() => unsaveVote(lastVotedItemId)),
          increaseVote(votedItemId).then(() => saveVote(votedItemId))
        ]);
      }
    })
    .then(() => true);
};

module.exports.getMostPopularPolls = (_, {startAt, howMany}) => {
  return DB.readWithinRange('/polls', startAt, howMany, 'id');
};

module.exports.getTrendingPolls = (_, {startAt, howMany}) => {
  return DB.readWithinRange('/polls', startAt, howMany, 'id');
};
