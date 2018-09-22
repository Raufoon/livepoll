import {requestPollInfo} from "../../util/cloud/livepoll";

export const actionFetchPollInfo = (id) => dispatch => {
  return requestPollInfo(id)
    .then(response => {
      dispatch(actionFetchPollInfoSuccess(response.livepoll));
    });
};

export const ACTION_FETCH_POLL_INFO_SUCCESS = 'ACTION_FETCH_POLL_INFO_SUCCESS';
export const actionFetchPollInfoSuccess = (livepoll) => ({
  type: ACTION_FETCH_POLL_INFO_SUCCESS,
  livepoll
});