const admin = require('firebase-admin');

const checkIdTokenExists = idToken => new Promise(
  (resolve, reject) => {
    if (!idToken) reject('No authorization token received!');
    resolve();
  }
);

const decodeIdToken = idToken =>
  checkIdTokenExists(idToken)
    .then(
      () => admin.auth()
        .verifyIdToken(idToken)
        .then(decoded => decoded.uid)
    );

const verifyIdToken =
  (idToken, id) =>
    decodeIdToken(idToken)
      .then(
        uid => {
          if (uid === id) return Promise.resolve(id);
          return Promise.reject('idToken validation failed');
        }
      );

module.exports.verifyIdToken = verifyIdToken;
module.exports.decodeIdToken = decodeIdToken;