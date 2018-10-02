import {requestPopularPolls, requestTrendingPolls} from "../../util/cloud/home";

export const actionFetchHome = () => dispatch => {
  dispatch(actionFetchPopularPolls(0, 10));
  dispatch(actionFetchTrendingPolls(0, 10));
};


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