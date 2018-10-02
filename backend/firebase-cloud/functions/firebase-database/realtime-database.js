const functions = require('firebase-functions');
const admin = require('firebase-admin');

const DB = {
  read(path) {
    return admin.database()
      .ref(path)
      .once('value')
      .then(snap=>snap.val());
  },
  readWithinRange(path, startAt, howMany, sortKey) {
    let promise = admin.database().ref(path);
    if (sortKey) {
      promise = promise.orderByChild(sortKey)
    } else {
      promise = promise.orderByKey();
    }
    promise = promise.startAt(startAt);
    if (sortKey) {
      promise = promise.limitToLast(howMany)
    } else {
      promise = promise.limitToFirst(howMany);
    }
    return promise.once('value')
      .then(snap => Object.values(snap.val() || {}));
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
  },
  getPushKey() {
    return admin.database().ref().push().key;
  },
  doTransaction(path, update) {
    return admin
      .database()
      .ref(path)
      .transaction(update);
  }
};
module.exports = DB;