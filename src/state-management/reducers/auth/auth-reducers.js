import initialState from "../../initial-state";

export const reduceSigninSuccess = (state, currentUser, userData) => Object.assign({}, {
  currentUser,
  userData: {
    ...userData,
    id: currentUser.uid
  }
});

export const reduceSignoutSuccess = () => ({...initialState.auth});

export const reduceAuthUserDataReceived = (state, userData) => ({
  currentUser: state.currentUser,
  userData: {
    ...state.userData,
    ...userData
  }
});