const admin = require('firebase-admin');

const firebaseIdTokenValidator = (request, response, next) => {
  if (!request.headers.authorization) {
    console.log('Unauthorized request O_O');
    response.status(403).send('Unauthorized request O_O')
  }

  const idToken = request.headers.authorization;
  admin.auth().verifyIdToken(idToken)
    .then(decodedIdToken => {
      request.user = decodedIdToken;
      return next();
    })
    .catch(error => {
      console.log('Unauthorized user O_O');
      response.status(403).send('Unauthorized user O_O')
    });
};

module.exports = firebaseIdTokenValidator;