import {getStateManagerWorker} from "../../init/state-manager-worker";
import {getLoggedInUser} from "../../util/cloud/auth";

export const actionFetchPollInfo = (id) => dispatch => {
  getStateManagerWorker().postMessage({
    action: 'ACTION_FETCH_POLL_INFO',
    payload: {
      id
    }
  });
};

export const actionRequestAddItem = (pollId, data) => dispatch => {
  getLoggedInUser().getIdToken().then(idToken => {
    getStateManagerWorker().postMessage({
      action: 'ACTION_REQUEST_ADD_ITEM',
      payload: {
        pollId, data, idToken
      }
    });
  });
};

export const actionRequestTopItems = (pollId, startAt, howMany) => dispatch => {
  getStateManagerWorker().postMessage({
    action: 'ACTION_FETCH_TOP_ITEMS',
    payload: {
      pollId, startAt, howMany
    }
  });
};

export const actionGiveVote = (pollId, itemId, lastVotedItemId) => dispatch => {
  getLoggedInUser().getIdToken().then(idToken => {
    getStateManagerWorker().postMessage({
      action: 'ACTION_GIVE_VOTE',
      payload: {
        idToken, pollId, itemId, lastVotedItemId
      }
    });
  });
};

export const actionFetchVoterList = (pollId, itemId, startAt, howMany) => dispatch => {
  getStateManagerWorker().postMessage({
    action: 'ACTION_FETCH_VOTER_LIST',
    payload: {
      pollId, itemId, startAt, howMany
    }
  });
};

export const ACTION_POLL_REALTIME_UPDATE = 'ACTION_POLL_REALTIME_UPDATE';
export const actionPollRealtimeUpdate = (pollId, itemId, voteCount) => ({
  type: ACTION_POLL_REALTIME_UPDATE,
  pollId, itemId, voteCount
});