const {verifyIdToken} = require('../util');
const uuidv1 = require('uuid/v1');
const DB = require("../../../firebase-database/realtime-database");

module.exports.publishLivepoll = (_, { settings }, context) => {
  const newPollId = uuidv1();
  return verifyIdToken(context.idToken, settings.creatorId)
    .then(
      () => DB.write(`/polls/${newPollId}`, {
        id: newPollId,
        settings
      })
    );
};