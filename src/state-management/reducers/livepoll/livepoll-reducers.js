export const reduceFetchPollInfoSuccess = (state, livepoll) => {
  let newState = {...state};
  if (!newState[livepoll.id]) {
    newState[livepoll.id] = livepoll;
  } else {
    newState[livepoll.id] = Object.assign({}, newState[livepoll.id], livepoll);
  }
  return newState;
};

export const reduceRequestAddItemSuccess = (state, pollId, newItem) => {
  let newState = {...state};
  if (!newState[pollId].items) newState[pollId].items = {};
  newState[pollId].items[newItem.id] = newItem;
  return newState;
};