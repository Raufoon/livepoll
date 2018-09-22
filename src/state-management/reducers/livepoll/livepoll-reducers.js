export const reduceFetchPollInfoSuccess = (state, livepoll) => {
  let newState = {...state};
  if (!newState[livepoll.id]) {
    newState[livepoll.id] = livepoll;
  } else {
    newState[livepoll.id] = Object.assign({}, newState[livepoll.id], livepoll);
  }
  return newState;
};