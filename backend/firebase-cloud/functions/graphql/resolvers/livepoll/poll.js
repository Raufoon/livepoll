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

// target: ensure if they are transaction
module.exports.vote = (_, { pollId, itemId }, context) => {
  let authUserId;
  let lastVotedItemId;

  // check if user already voted
  return decodeIdToken(context.idToken).then(decodedUid => {
    authUserId = decodedUid;
    return DB.read(`users/${authUserId}/votedPolls/${pollId}`);
  })
    .then(_lastVotedItemId => {
      // fetch the votecount of the item and previously voted item (if any)
      let fetchVoteCountPromiseList = [
        DB.read(`polls/${pollId}/items/${itemId}/voteCount`)
      ];

      if (_lastVotedItemId) {
        lastVotedItemId = _lastVotedItemId;
        fetchVoteCountPromiseList.push(
          DB.read(`polls/${pollId}/items/${lastVotedItemId}/voteCount`)
        );
      }
      return Promise.all(fetchVoteCountPromiseList);
    })
    .then(voteCountList => {
      // cancel the vote of previously voted item and vote the new item
      let dbWritePromises = [
        DB.write(`polls/${pollId}/items/${itemId}/voteCount`, voteCountList[0] + 1),
        DB.write(`polls/${pollId}/items/${itemId}/voterIds/${authUserId}`, true),
        DB.write(`users/${authUserId}/votedPolls/${pollId}`, itemId)
      ];
      if (lastVotedItemId) {
        dbWritePromises.push(
          DB.write(`polls/${pollId}/items/${lastVotedItemId}/voteCount`, voteCountList[1] - 1)
        );
        dbWritePromises.push(
          DB.remove(`polls/${pollId}/items/${lastVotedItemId}/voterIds/${authUserId}`)
        );
      }
      // in the end, return the vote count of the new item
      return Promise.all(dbWritePromises).then(() => voteCountList[0] + 1);
    })
};