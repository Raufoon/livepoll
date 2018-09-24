import initialState from "../../initial-state";
import {ACTION_AUTH_USERDATA_RECEIVED, ACTION_SIGNIN_SUCCESS, ACTION_SIGNOUT_SUCCESS} from "../../actions/auth-actions";
import {reduceAuthUserDataReceived, reduceSigninSuccess, reduceSignoutSuccess} from "./auth-reducers";

const authRootReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case ACTION_SIGNIN_SUCCESS:
      return reduceSigninSuccess(state, action.currentUser, action.userData);

    case ACTION_SIGNOUT_SUCCESS:
      return reduceSignoutSuccess();

    case ACTION_AUTH_USERDATA_RECEIVED:
      return reduceAuthUserDataReceived(state, action.userData);

    default:
      return state;
  }
};

export default authRootReducer