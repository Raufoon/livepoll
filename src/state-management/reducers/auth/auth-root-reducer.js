import initialState from "../../initial-state";
import {ACTION_SIGNIN_SUCCESS, ACTION_SIGNOUT_SUCCESS} from "../../actions/auth-actions";
import {reduceSigninSuccess, reduceSignoutSuccess} from "./auth-reducers";

const authRootReducer = (state = initialState.auth, action) => {
  let newState;
  switch (action.type) {
    case ACTION_SIGNIN_SUCCESS:
      newState = reduceSigninSuccess(state, action.currentUser, action.userData);
      break;
    case ACTION_SIGNOUT_SUCCESS:
      newState = reduceSignoutSuccess();
      break;
    default:
      newState = state;
  }
  return newState;
};

export default authRootReducer