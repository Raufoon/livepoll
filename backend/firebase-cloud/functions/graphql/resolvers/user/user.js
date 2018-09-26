const {decodeIdToken} = require('../util');
const DB = require("../../../firebase-database/realtime-database");

module.exports.haveIVoted = (_, { pollId }, context) => {
  return decodeIdToken(context.idToken)
    .then(decodedUid => {
      return DB.read(`/users/${decodedUid}/votedPolls/${pollId}`);
    });
};