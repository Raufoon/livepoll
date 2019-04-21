import {actionMakeInfoToast} from "./toast-actions";
import {getStateManagerWorker} from "../../state-manager-worker";

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
};

export const actionFetchTrendingPolls = (startAt, howMany) => dispatch => {
  getStateManagerWorker().postMessage({
    action: 'ACTION_FETCH_TRENDING_POLLS',
    payload: {
      startAt, howMany
    }
  });
};