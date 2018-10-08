import initialState, {initialBlankState} from "../initial-state";
import {ACTION_SIGNIN_SUCCESS, ACTION_SIGNOUT_SUCCESS} from "../actions/auth-actions";
import {getStateManagerWorker} from "../../init/state-manager-worker";
import {ACTION_SYNC_MAIN_AND_WORKER} from "../actions/worker-sync-actions";

const authReducer = (state = initialState.auth, action) => {
  switch (action.type) {
    case ACTION_SIGNIN_SUCCESS:
      return {
        ...state,
        currentUser: action.currentUser
      };

    case ACTION_SIGNOUT_SUCCESS:
      return {
        ...initialBlankState.auth
      };

    default:
      return state;
  }
};

export default authReducer