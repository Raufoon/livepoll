import {requestAddPollitem, requestPollInfo} from "../../util/cloud/livepoll";

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

export const actionRequestAddItem = (pollId, data) => dispatch => {
  return requestAddPollitem(pollId, data)
    .then(response => dispatch(actionRequestAddItemSuccess(pollId, response.item)))
};

export const ACTION_REQUEST_ADD_ITEM_SUCCESS = 'ACTION_REQUEST_ADD_ITEM_SUCCESS';
export const actionRequestAddItemSuccess = (pollId, newItem) => ({
  type: ACTION_REQUEST_ADD_ITEM_SUCCESS,
  pollId,
  newItem
});