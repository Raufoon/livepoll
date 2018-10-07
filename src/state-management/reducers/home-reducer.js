import initialState, {initialBlankState} from "../initial-state";
import {
  ACTION_FETCH_POPULAR_POLLS_SUCCESS,
  ACTION_FETCH_TRENDING_POLLS_SUCCESS
} from "../actions/home-actions";
import {ACTION_SIGNOUT_SUCCESS} from "../actions/auth-actions";

const homeReducer = (state = initialState.homePage, action) => {
  switch (action.type) {
    case ACTION_FETCH_POPULAR_POLLS_SUCCESS:
      return {
        ...state,
        popularPolls: Object.values({
          ...state.popularPolls,
          ...action.popularPolls,
        })
      };

    case ACTION_FETCH_TRENDING_POLLS_SUCCESS:
      return {
        ...state,
        trendingPolls: Object.values({
          ...state.trendingPolls,
          ...action.trendingPolls,
        })
      };

    case ACTION_SIGNOUT_SUCCESS:
      return {
        ...state,
        ...initialBlankState.homePage
      };

    default:
      return state;
  }
};

export default homeReducer;