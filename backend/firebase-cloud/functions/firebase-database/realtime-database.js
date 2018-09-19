const functions = require('firebase-functions');
const admin = require('firebase-admin');

const DB = {
  init() {
    admin.initializeApp();
  },
  read(path) {
    return admin.database()
      .ref(path)
      .once('value')
      .then(snap=>snap.val());
  },
  readList(path) {
    return admin.database()
      .ref(path)
      .once('value')
      .then(snap=>Object.values(snap.val() || {}));
  },
  write(path, object) {
    return new Promise((res, rej) => {
      admin.database()
        .ref(path)
        .set(object, function(error) {
          if (error) {
            rej();
          } else {
            res(object);
          }
        });
    });
  },
  remove(path) {
    return admin.database()
      .ref(path)
      .remove();
  }
};
DB.init();
module.exports = DB;