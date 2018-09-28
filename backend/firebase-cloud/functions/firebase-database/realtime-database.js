const functions = require('firebase-functions');
const admin = require('firebase-admin');

const DB = {
  exists(path) {
    return admin.database()
      .ref(path)
      .once('value')
      .then(snap=>snap.exists());
  },
  read(path) {
    return admin.database()
      .ref(path)
      .once('value')
      .then(snap=>snap.val());
  },
  readWithinRange(path, limit, lastItemId) {
    let promise = admin.database()
      .ref(path)
      .orderByKey();

    if (lastItemId) {
      promise = promise.startAt(lastItemId)
    }
    return promise
      .limitToFirst(lastItemId ? limit + 1: limit)
      .once('value')
      .then(snap => Object.values(snap.val() || {}))
      .then(_items => {
        let items = _items;
        if (!items || items.length === 0) return [];
        if (lastItemId) items.shift();
        return items;
      });
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