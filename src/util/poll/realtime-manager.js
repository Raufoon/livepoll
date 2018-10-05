import firebase from 'firebase/app'
import 'firebase/database'

const LIMIT = 15;

let mapPollIdToTop15Items = {
  // polid: { itemNid: {} }
};
let stateUpdators = {
  // pollId: func(pollId, itemId, value)
};

const turnOn = (pollId, itemId) => {
  stateUpdators[pollId][itemId] = snap => {
    stateUpdators[pollId](pollId, itemId, snap.val());
  };
  firebase.database().ref(`itemList/${pollId}/${itemId}/voteCount`)
    .on('value', stateUpdators[pollId][itemId]);
};
const turnOff = (pollId, itemId) => {
  firebase.database().ref(`itemList/${pollId}/${itemId}/voteCount`)
    .off('value', stateUpdators[pollId][itemId]);
};

export const subscribeRealtime = (pollId, stateUpdator) => {
  mapPollIdToTop15Items[pollId] = {};
  stateUpdators[pollId] = stateUpdator;
};

export const updateRealtimeItems = (pollId, items) => {
  let mapNewItemsKeyValue = {
    // itemId: item
  };
  let itemId;
  let newSubscriberItemIds = [];

  for (let i=0; i < LIMIT && i<items.length; i++) {
    itemId = items[i].id;
    mapNewItemsKeyValue[itemId] = items[i];
    if (!mapPollIdToTop15Items[pollId][itemId]) {
      newSubscriberItemIds.push(itemId);
    }
  }

  let alreadyExistingItemIds = Object.keys(mapPollIdToTop15Items[pollId]);
  let cancelSubscriptionItemIds = [];
  for (let i = 0; i < alreadyExistingItemIds.length; i++) {
    itemId = alreadyExistingItemIds[i];
    if (!mapNewItemsKeyValue[itemId]) {
      cancelSubscriptionItemIds.push(itemId);
    }
  }

  mapPollIdToTop15Items[pollId] = mapNewItemsKeyValue;
  console.log('New subscribers for poll ' + pollId);
  console.log(newSubscriberItemIds);
  for (let i=0; i<newSubscriberItemIds.length; i++) {
    turnOn(pollId, newSubscriberItemIds[i]);
  }

  console.log('Cancel following subscription for poll ' + pollId);
  console.log(cancelSubscriptionItemIds);
  for (let i=0; i<cancelSubscriptionItemIds.length; i++) {
    turnOff(pollId, cancelSubscriptionItemIds[i]);
  }
};

export const unsubscribeRealtime = pollId => {
  let cancelSubscriptionItemIds = Object.keys(mapPollIdToTop15Items[pollId]);

  console.log('Cancel following subscription for poll ' + pollId);
  console.log(cancelSubscriptionItemIds);
  for (let i=0; i<cancelSubscriptionItemIds.length; i++) {
    turnOff(pollId, cancelSubscriptionItemIds[i]);
  }

  delete mapPollIdToTop15Items[pollId];
};