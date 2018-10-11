import initialState from "../initial-state";
import {ACTION_HIDE_FULLSCR_LOADER, ACTION_SHOW_FULLSCR_LOADER} from "../actions/loader-actions";
import {ACTION_SYNC_MAIN_AND_WORKER} from "../actions/worker-sync-actions";

const loaderReducer = (state = initialState.loader, action) => {
  switch (action.type) {
    case ACTION_SHOW_FULLSCR_LOADER:
      return {
        ...state,
        fullScreenLoader: {
          show: true,
          message: action.message
        }
      };

    case ACTION_HIDE_FULLSCR_LOADER:
      return {
        ...state,
        fullScreenLoader: {
          show: false,
          message: ''
        }
      };

    case ACTION_SYNC_MAIN_AND_WORKER:
      return action.newState.loader ? action.newState.loader : state;

    default:
      return state;
  }
};

export default loaderReducer