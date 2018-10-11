import initialState from "../initial-state";
import {ACTION_HIDE_FULLSCR_LOADER, ACTION_SHOW_FULLSCR_LOADER} from "../actions/loader-actions";

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

    default:
      return state;
  }
};

export default loaderReducer