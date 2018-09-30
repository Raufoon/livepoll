import initialState from "../initial-state";
import {ACTION_SIGNIN_SUCCESS, ACTION_SIGNOUT_SUCCESS} from "../actions/auth-actions";

const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case ACTION_SIGNIN_SUCCESS:
      return {
        ...state,
        currentUser: action.currentUser
      };

    case ACTION_SIGNOUT_SUCCESS:
      return {
        ...initialState.auth
      };

    default:
      return state;
  }
};

export default authReducer