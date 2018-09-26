import initialState from "../../initial-state";
import {ACTION_SIGNIN_SUCCESS, ACTION_SIGNOUT_SUCCESS} from "../../actions/auth-actions";
import {reduceSigninSuccess, reduceSignoutSuccess} from "./auth-reducers";

const authRootReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case ACTION_SIGNIN_SUCCESS:
      return reduceSigninSuccess(state, action.currentUser);

    case ACTION_SIGNOUT_SUCCESS:
      return reduceSignoutSuccess();

    default:
      return state;
  }
};

export default authRootReducer