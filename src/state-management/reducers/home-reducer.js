import initialState, {initialBlankState} from "../initial-state";
import {ACTION_SIGNOUT_SUCCESS} from "../actions/auth-actions";
import {ACTION_SYNC_MAIN_AND_WORKER} from "../actions/worker-sync-actions";
import {getStateManagerWorker} from "../../init/state-manager-worker";

const homeReducer = (state = initialState.homePage, action) => {
  let newState;

  switch (action.type) {
    case ACTION_SIGNOUT_SUCCESS:
      newState = {
        ...state,
        ...initialBlankState.homePage
      };
      getStateManagerWorker().postMessage({
        action: ACTION_SYNC_MAIN_AND_WORKER,
        payload: {
          homePage: newState
        }
      });
      return newState;

    case ACTION_SYNC_MAIN_AND_WORKER:
      return action.newState.homePage ? action.newState.homePage : state;

    default:
      return state;
  }
};

export default homeReducer;