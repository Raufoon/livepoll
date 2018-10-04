import {
  requestAddPollitem,
  requestGiveVote,
  requestPollInfo,
  requestTopItems, requestVoterList
} from "../../util/cloud/livepoll";
import {actionAlreadyVotedPollFound} from "./my-profile-actions";
import {actionMakeInfoToast, actionMakeSuccessToast, actionMakeWarningToast} from "./toast-actions";

export const actionFetchPollInfo = (id) => dispatch => {
  dispatch(actionMakeWarningToast('Fetching poll info...'));
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
  dispatch(actionMakeWarningToast('Adding a new item...'));
  return requestAddPollitem(pollId, data)
    .then(response => {
      dispatch(actionMakeSuccessToast('Item successfully added'));
      dispatch(actionRequestAddItemSuccess(pollId, response.item))
    })
};

export const ACTION_REQUEST_ADD_ITEM_SUCCESS = 'ACTION_REQUEST_ADD_ITEM_SUCCESS';
export const actionRequestAddItemSuccess = (pollId, newItem) => ({
  type: ACTION_REQUEST_ADD_ITEM_SUCCESS,
  pollId,
  newItem
});

export const actionRequestTopItems = (pollId, startAt, howMany) => dispatch => {
  dispatch(actionMakeInfoToast('Loading the top items...'));
  return requestTopItems(pollId, startAt, howMany)
    .then(response => {
      dispatch(actionRequestTopItemsSuccess(pollId, response.livepoll.items))
    });
};

export const ACTION_REQUEST_TOP_ITEMS_SUCCESS = 'ACTION_REQUEST_TOP_ITEMS_SUCCESS';
export const actionRequestTopItemsSuccess = (pollId, items) => ({
  type: ACTION_REQUEST_TOP_ITEMS_SUCCESS,
  pollId,
  items
});

export const actionGiveVote = (pollId, itemId, lastVotedItemId) => dispatch => {
  dispatch(actionMakeWarningToast(
    itemId === lastVotedItemId? 'Cancelling your vote':'Sending your vote...'
  ));
  return requestGiveVote(pollId, itemId)
    .then(response => {
      dispatch(actionMakeSuccessToast(
        itemId === lastVotedItemId? 'Vote cancelled':'Vote successful'
      ));
      dispatch(actionGiveVoteSuccess(pollId, itemId, lastVotedItemId));
      dispatch(actionAlreadyVotedPollFound(pollId, itemId, lastVotedItemId));
    });
};

export const ACTION_GIVE_VOTE_SUCCESS = 'ACTION_GIVE_VOTE_SUCCESS';
export const actionGiveVoteSuccess = (pollId, itemId, lastVotedItemId) => ({
  type: ACTION_GIVE_VOTE_SUCCESS,
  pollId, itemId, lastVotedItemId
});

export const actionFetchVoterList = (pollId, itemId, startAt, howMany) => dispatch => {
  dispatch(actionMakeWarningToast('Fetching the voter list'));
  requestVoterList(pollId, itemId, startAt, howMany)
    .then(voterList => {
      dispatch(actionMakeSuccessToast('Voter list loaded'));
      dispatch(actionFetchVoterListSuccess(pollId, itemId, voterList));
    })
};

export const ACTION_FETCH_VOTER_LIST_SUCCESS = 'ACTION_FETCH_VOTER_LIST_SUCCESS';
export const actionFetchVoterListSuccess = (pollId, itemId, voterList) => ({
  type: ACTION_FETCH_VOTER_LIST_SUCCESS,
  pollId, itemId, voterList
});