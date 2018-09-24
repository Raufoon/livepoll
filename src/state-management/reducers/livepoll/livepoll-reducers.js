export const reduceFetchPollInfoSuccess = (pollState, livepoll) => {
  return {...pollState, ...livepoll};
};

export const reduceRequestAddItemSuccess = (pollState, newItem) => {
  let newState = {...pollState};
  newState.items = {...newState.items};
  newState.items[newItem.id] = newItem;
  return newState;
};