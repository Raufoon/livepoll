import {requestPopularPolls, requestTrendingPolls} from "../../util/cloud/home";
import {actionMakeErrorToast, actionMakeInfoToast} from "./toast-actions";
import {getStateManagerWorker} from "../../init/state-manager-worker";

export const actionFetchHome = () => dispatch => {
  dispatch(actionMakeInfoToast('Fetching polls...'));
  dispatch(actionFetchPopularPolls(0, 10));
  dispatch(actionFetchTrendingPolls(0, 10));
};


export const actionFetchPopularPolls = (startAt, howMany) => dispatch => {
  getStateManagerWorker().postMessage({
    action: 'ACTION_FETCH_POPULAR_POLLS',
    payload: {
      startAt, howMany
    }
  });
  // return requestPopularPolls(startAt, howMany)
  //   .then(response => {
  //     dispatch(actionFetchPopularPollsSuccess(response.popularPolls));
  //   })
  //   .catch(() => dispatch(actionMakeErrorToast('Failed to load polls. Please refresh!')));
};
// export const ACTION_FETCH_POPULAR_POLLS_SUCCESS = 'ACTION_FETCH_POPULAR_POLLS_SUCCESS';
// export const actionFetchPopularPollsSuccess = popularPolls => ({
//   type: ACTION_FETCH_POPULAR_POLLS_SUCCESS,
//   popularPolls
// });

export const actionFetchTrendingPolls = (startAt, howMany) => dispatch => {
  getStateManagerWorker().postMessage({
    action: 'ACTION_FETCH_TRENDING_POLLS',
    payload: {
      startAt, howMany
    }
  });
  // return requestTrendingPolls(startAt, howMany)
  //   .then(response => {
  //     dispatch(actionFetchTrendingPollsSuccess(response.trendingPolls));
  //   })
  //   .catch(() => dispatch(actionMakeErrorToast('Failed to fetch polls. Please refresh!')));
};
// export const ACTION_FETCH_TRENDING_POLLS_SUCCESS = 'ACTION_FETCH_TRENDING_POLLS_SUCCESS';
// export const actionFetchTrendingPollsSuccess = trendingPolls => ({
//   type: ACTION_FETCH_TRENDING_POLLS_SUCCESS,
//   trendingPolls
// });