import {requestPopularPolls, requestRecentPolls, requestTrendingPolls} from "../../util/cloud/home";

export const actionFetchHome = () => dispatch => {
  dispatch(actionFetchPopularPolls(0, 5));
  dispatch(actionFetchTrendingPolls(0, 5));
};


export const actionFetchRecentPolls = (startAt, howMany) => dispatch => {
  return requestRecentPolls(startAt, howMany)
    .then(response => {
      dispatch(actionFetchRecentPollsSuccess(response.recentPolls));
    });
};
export const ACTION_FETCH_RECENT_POLLS_SUCCESS = 'ACTION_FETCH_RECENT_POLLS_SUCCESS';
export const actionFetchRecentPollsSuccess = recentPolls => ({
  type: ACTION_FETCH_RECENT_POLLS_SUCCESS,
  recentPolls
});


export const actionFetchPopularPolls = (startAt, howMany) => dispatch => {
  return requestPopularPolls(startAt, howMany)
    .then(response => {
      dispatch(actionFetchPopularPollsSuccess(response.popularPolls));
    });
};
export const ACTION_FETCH_POPULAR_POLLS_SUCCESS = 'ACTION_FETCH_POPULAR_POLLS_SUCCESS';
export const actionFetchPopularPollsSuccess = popularPolls => ({
  type: ACTION_FETCH_POPULAR_POLLS_SUCCESS,
  popularPolls
});

export const actionFetchTrendingPolls = (startAt, howMany) => dispatch => {
  return requestTrendingPolls(startAt, howMany)
    .then(response => {
      dispatch(actionFetchTrendingPollsSuccess(response.trendingPolls));
    });
};
export const ACTION_FETCH_TRENDING_POLLS_SUCCESS = 'ACTION_FETCH_TRENDING_POLLS_SUCCESS';
export const actionFetchTrendingPollsSuccess = trendingPolls => ({
  type: ACTION_FETCH_TRENDING_POLLS_SUCCESS,
  trendingPolls
});