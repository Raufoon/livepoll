import initialState from "../../initial-state";

export const reduceSigninSuccess = (state, currentUser, userData) => Object.assign({}, {
  currentUser,
  userData
});

export const reduceSignoutSuccess = () => ({...initialState.auth});