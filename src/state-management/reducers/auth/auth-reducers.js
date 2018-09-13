import initialState from "../../initial-state";

export const reduceSigninSuccess = (state, currentUser) => Object.assign({}, {currentUser});

export const reduceSignoutSuccess = () => ({...initialState.auth});