import initialState from "../initial-state";
import {
  ACTION_FETCH_POPULAR_POLLS_SUCCESS,
  ACTION_FETCH_RECENT_POLLS_SUCCESS,
  ACTION_FETCH_TRENDING_POLLS_SUCCESS
} from "../actions/home-actions";

const homeReducer = (state = initialState.homePage, action) => {
  switch (action.type) {
    case ACTION_FETCH_POPULAR_POLLS_SUCCESS:
      return {
        ...state,
        popularPolls: {
          ...state.popularPolls,
          ...action.popularPolls,
        }
      };

    case ACTION_FETCH_RECENT_POLLS_SUCCESS:
      return {
        ...state,
        recentPolls: {
          ...state.recentPolls,
          ...action.recentPolls,
        }
      };

    case ACTION_FETCH_TRENDING_POLLS_SUCCESS:
      return {
        ...state,
        trendingPolls: {
          ...state.trendingPolls,
          ...action.trendingPolls,
        }
      };

    default:
      return state;
  }
};

export default homeReducer;