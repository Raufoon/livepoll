import {
  requestAddPollitem,
  requestGiveVote,
  requestPollInfo,
  requestTopItems, requestVoteCountsByIdList, requestVoterList
} from "../../util/cloud/livepoll";
import {actionAlreadyVotedPollFound} from "./my-profile-actions";
import {
  actionMakeErrorToast,
  actionMakeInfoToast,
  actionMakeSuccessToast,
  actionMakeWarningToast
} from "./toast-actions";
import {getStateManagerWorker} from "../../init/state-manager-worker";

export const actionFetchPollInfo = (id) => dispatch => {
  getStateManagerWorker().postMessage({
    action: 'ACTION_FETCH_POLL_INFO',
    payload: {
      id
    }
  });
  // dispatch(actionMakeWarningToast('Fetching poll info...'));
  // return requestPollInfo(id)
  //   .then(response => {
  //     dispatch(actionFetchPollInfoSuccess(response.livepoll));
  //   })
  //   .catch(() => dispatch(actionMakeErrorToast('Failed to fetch poll info!')));
};

// export const ACTION_FETCH_POLL_INFO_SUCCESS = 'ACTION_FETCH_POLL_INFO_SUCCESS';
// export const actionFetchPollInfoSuccess = (livepoll) => ({
//   type: ACTION_FETCH_POLL_INFO_SUCCESS,
//   livepoll
// });

export const actionRequestAddItem = (pollId, data) => dispatch => {
  getStateManagerWorker().postMessage({
    action: 'ACTION_REQUEST_ADD_ITEM',
    payload: {
      pollId, data
    }
  });
  // dispatch(actionMakeWarningToast('Adding a new item...'));
  // return requestAddPollitem(pollId, data)
  //   .then(response => {
  //     dispatch(actionMakeSuccessToast('Item successfully added'));
  //     dispatch(actionRequestAddItemSuccess(pollId, response.item))
  //   })
  //   .catch(() => dispatch(actionMakeErrorToast('Failed to add item!')))
};

// export const ACTION_REQUEST_ADD_ITEM_SUCCESS = 'ACTION_REQUEST_ADD_ITEM_SUCCESS';
// export const actionRequestAddItemSuccess = (pollId, newItem) => ({
//   type: ACTION_REQUEST_ADD_ITEM_SUCCESS,
//   pollId,
//   newItem
// });

export const actionRequestTopItems = (pollId, startAt, howMany) => dispatch => {
  getStateManagerWorker().postMessage({
    action: 'ACTION_FETCH_TOP_ITEMS',
    payload: {
      pollId, startAt, howMany
    }
  });
  // dispatch(actionMakeInfoToast('Loading the top items...'));
  // return requestTopItems(pollId, startAt, howMany)
  //   .then(response => {
  //     dispatch(actionRequestTopItemsSuccess(pollId, response.livepoll.items))
  //   })
  //   .catch(() => dispatch(actionMakeErrorToast('Failed to load items!')));
};

// export const ACTION_REQUEST_TOP_ITEMS_SUCCESS = 'ACTION_REQUEST_TOP_ITEMS_SUCCESS';
// export const actionRequestTopItemsSuccess = (pollId, items) => ({
//   type: ACTION_REQUEST_TOP_ITEMS_SUCCESS,
//   pollId,
//   items
// });

export const actionGiveVote = (pollId, itemId, lastVotedItemId) => dispatch => {
  getStateManagerWorker().postMessage({
    action: 'ACTION_GIVE_VOTE',
    payload: {
      pollId, itemId, lastVotedItemId
    }
  });
  // dispatch(actionMakeWarningToast(
  //   itemId === lastVotedItemId? 'Cancelling your vote':'Sending your vote...'
  // ));
  // return requestGiveVote(pollId, itemId)
  //   .then(() => {
  //     dispatch(actionMakeSuccessToast(
  //       itemId === lastVotedItemId? 'Vote cancelled':'Vote successful'
  //     ));
  //     dispatch(actionAlreadyVotedPollFound(pollId, itemId, lastVotedItemId));
  //
  //     requestVoteCountsByIdList(pollId,
  //       lastVotedItemId && lastVotedItemId !== itemId ? [itemId, lastVotedItemId] : [itemId]
  //     )
  //       .then(response => {
  //         dispatch(actionGiveVoteSuccess(pollId, response.livepoll.items));
  //       })
  //   })
  //   .catch(() => dispatch(actionMakeErrorToast('Failed to give vote! Try again?')));
};

// export const ACTION_GIVE_VOTE_SUCCESS = 'ACTION_GIVE_VOTE_SUCCESS';
// export const actionGiveVoteSuccess = (pollId, updatedItems) => ({
//   type: ACTION_GIVE_VOTE_SUCCESS,
//   pollId, updatedItems
// });

export const actionFetchVoterList = (pollId, itemId, startAt, howMany) => dispatch => {
  getStateManagerWorker().postMessage({
    action: 'ACTION_FETCH_VOTER_LIST',
    payload: {
      pollId, itemId, startAt, howMany
    }
  });
  // dispatch(actionMakeWarningToast('Fetching the voter list'));
  // requestVoterList(pollId, [itemId], startAt, howMany)
  //   .then(voterList => {
  //     dispatch(actionMakeSuccessToast('Voter list loaded'));
  //     dispatch(actionFetchVoterListSuccess(pollId, itemId, voterList));
  //   })
  //   .catch(() => dispatch(actionMakeErrorToast('Failed to fetch voter list')))
};

// export const ACTION_FETCH_VOTER_LIST_SUCCESS = 'ACTION_FETCH_VOTER_LIST_SUCCESS';
// export const actionFetchVoterListSuccess = (pollId, itemId, voterList) => ({
//   type: ACTION_FETCH_VOTER_LIST_SUCCESS,
//   pollId, itemId, voterList
// });

export const ACTION_POLL_REALTIME_UPDATE = 'ACTION_POLL_REALTIME_UPDATE';
export const actionPollRealtimeUpdate = (pollId, itemId, voteCount) => ({
  type: ACTION_POLL_REALTIME_UPDATE,
  pollId, itemId, voteCount
});