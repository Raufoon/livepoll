import initialState from "../initial-state";
import {ACTION_HIDE_FULLSCR_LOADER, ACTION_SHOW_FULLSCR_LOADER} from "../actions/loader-actions";
import {ACTION_SYNC_MAIN_AND_WORKER} from "../actions/worker-sync-actions";

const loaderReducer = (state = initialState.loader, action) => {
  let newState;

  switch (action.type) {
    case ACTION_SHOW_FULLSCR_LOADER:
      newState = {
        ...state,
        fullScreenLoader: {
          show: true,
          message: action.message
        }
      };
      postMessage({
        loader: newState,
      });
      return newState;

    case ACTION_HIDE_FULLSCR_LOADER:
      newState = {
        ...state,
        fullScreenLoader: {
          show: false,
          message: ''
        }
      };
      postMessage({
        loader: newState,
      });
      return newState;

    case ACTION_SYNC_MAIN_AND_WORKER:
      return action.newState.loader ? action.newState.loader : state;

    default:
      return state;
  }
};

export default loaderReducer