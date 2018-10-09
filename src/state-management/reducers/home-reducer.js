import initialState, {initialBlankState} from "../initial-state";
import {
  ACTION_FETCH_POPULAR_POLLS_SUCCESS,
  ACTION_FETCH_TRENDING_POLLS_SUCCESS
} from "../actions/home-actions";
import {ACTION_SIGNOUT_SUCCESS} from "../actions/auth-actions";
import {ACTION_SYNC_MAIN_AND_WORKER} from "../actions/worker-sync-actions";

const homeReducer = (state = initialState.homePage, action) => {
  switch (action.type) {
    case ACTION_SIGNOUT_SUCCESS:
      return {
        ...state,
        ...initialBlankState.homePage
      };

    case ACTION_SYNC_MAIN_AND_WORKER:
      return action.newState.homePage ? action.newState.homePage : state;

    default:
      return state;
  }
};

export default homeReducer;