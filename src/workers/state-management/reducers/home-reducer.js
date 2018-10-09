import initialState, {initialBlankState} from "../initial-state";
import {
  ACTION_FETCH_POPULAR_POLLS_SUCCESS,
  ACTION_FETCH_TRENDING_POLLS_SUCCESS
} from "../actions/home-actions";
import {ACTION_SIGNOUT_SUCCESS} from "../actions/auth-actions";
import {ACTION_SYNC_MAIN_AND_WORKER} from "../actions/worker-sync-actions";

const homeReducer = (state = initialState.homePage, action) => {
  let newState;
  switch (action.type) {
    case ACTION_FETCH_POPULAR_POLLS_SUCCESS:
      newState = {
        ...state,
        popularPolls: Object.values({
          ...state.popularPolls,
          ...action.popularPolls,
        })
      };
      postMessage({
        homePage: newState
      });
      return newState;

    case ACTION_FETCH_TRENDING_POLLS_SUCCESS:
      newState = {
        ...state,
        trendingPolls: Object.values({
          ...state.trendingPolls,
          ...action.trendingPolls,
        })
      };
      postMessage({
        homePage: newState
      });
      return newState;

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