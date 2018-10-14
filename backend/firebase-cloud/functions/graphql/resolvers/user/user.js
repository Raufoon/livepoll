const {decodeIdToken} = require('../util');
const DB = require("../../../firebase-database/realtime-database");

module.exports.haveIVoted = (_, { pollId }, context) => {
  return decodeIdToken(context.idToken)
    .then(decodedUid => {
      return DB.read(`/myVotedPolls/${decodedUid}/${pollId}`);
    });
};

module.exports.createUser = (_, args, context) => {
  return decodeIdToken(context.idToken)
    .then(decodedUid => DB.write(`/users/${decodedUid}`, {
      id: decodedUid
    }));
};

module.exports.updateProfileBasicInfo = (_, {newBasicInfo}, context) => {
  let authUid;
  return decodeIdToken(context.idToken)
    .then(decodedUid => {
      authUid = decodedUid;
      return DB.read(`/users/${decodedUid}/basicInfo`)
    })
    .then(existingData => {
      return DB.write(`/users/${authUid}/basicInfo`, Object.assign({}, existingData, newBasicInfo))
    });
};

module.exports.myPolls = (_, {startAt, howMany}, context) => {
  return decodeIdToken(context.idToken)
    .then(decodedUid => DB.read(`myPolls/${decodedUid}`))
    .then(pollIdDTO => Object.keys(pollIdDTO))
    .then(pollIdList => pollIdList.slice(startAt, howMany))
    .then(pollIdList => Promise.all(
      pollIdList.map(pollId => DB.read(`polls/${pollId}`))
    ));
};