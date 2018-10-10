import initialState, {initialBlankState} from "../initial-state";
import {
  ACTION_AUTH_LOADING,
  ACTION_SIGNIN_SUCCESS,
  ACTION_SIGNOUT_SUCCESS,
  ACTION_STOP_AUTH_LOADING
} from "../actions/auth-actions";

const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case ACTION_SIGNIN_SUCCESS:
      return {
        ...state,
        currentUser: action.currentUser,
        isLoading: false
      };

    case ACTION_SIGNOUT_SUCCESS:
      return {
        ...initialBlankState.auth,
        isLoading: false
      };

    case ACTION_AUTH_LOADING:
      return {
        ...state,
        isLoading: true
      };

    case ACTION_STOP_AUTH_LOADING:
      return {
        ...state,
        isLoading: true
      };

    default:
      return state;
  }
};

export default authReducer