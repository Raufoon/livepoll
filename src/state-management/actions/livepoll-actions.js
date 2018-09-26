import {requestAddPollitem, requestFirstNItems, requestGiveVote, requestPollInfo} from "../../util/cloud/livepoll";

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

export const actionRequestFirstNItems = (pollId, limit, startItemId) => dispatch => {
  return requestFirstNItems(pollId, limit, startItemId)
    .then(response => dispatch(actionRequestFirstNItemsSuccess(pollId, response.items)))
};

export const ACTION_REQUEST_FIRST_N_ITEMS_SUCCESS = 'ACTION_REQUEST_FIRST_N_ITEMS_SUCCESS';
export const actionRequestFirstNItemsSuccess = (pollId, items) => ({
  type: ACTION_REQUEST_FIRST_N_ITEMS_SUCCESS,
  pollId,
  items
});

export const actionGiveVote = (pollId, itemId, lastVotedItemId) => dispatch => {
  return requestGiveVote(pollId, itemId)
    .then(response =>
      dispatch(actionGiveVoteSuccess(pollId, itemId, lastVotedItemId)));
};

export const ACTION_GIVE_VOTE_SUCCESS = 'ACTION_GIVE_VOTE_SUCCESS';
export const actionGiveVoteSuccess = (pollId, itemId, lastVotedItemId) => ({
  type:ACTION_GIVE_VOTE_SUCCESS,
  pollId, itemId, lastVotedItemId
});