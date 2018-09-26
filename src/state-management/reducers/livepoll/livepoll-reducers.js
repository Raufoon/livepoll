export const reduceFetchPollInfoSuccess = (pollState, livepoll) => {
  return {...pollState, ...livepoll};
};

export const reduceRequestAddItemSuccess = (pollState, newItem) => {
  let newState = {...pollState};
  newState.items = {...newState.items};
  newState.items[newItem.id] = newItem;
  return newState;
};

export const reduceRequestFirstNItemsSuccess = (pollState, newItems) => {
  let newState = {...pollState};
  newState.items = {...newState.items};
  for (let i=0; i<newItems.length; i++)
    newState.items[newItems[i].id] = newItems[i];
  return newState;
};

export const reduceGiveVoteSuccess = (pollState, itemId, lastVotedItemId) => {
  let newPollState = {...pollState};
  newPollState.items[itemId].voteCount++;
  if (lastVotedItemId) {
    newPollState.items[lastVotedItemId].voteCount++;
  }
  return newItemState;
};