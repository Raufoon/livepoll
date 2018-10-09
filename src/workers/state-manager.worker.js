import {getLivepollStore, initAppState} from "./init";
import {actionFetchPopularPolls, actionFetchTrendingPolls} from "./state-management/actions/home-actions";
import {
  actionRequestCheckAlreadyVotedPoll,
  actionRequestUpdateBasicInfo
} from "./state-management/actions/my-profile-actions";
import {
  actionFetchPollInfo,
  actionFetchVoterList,
  actionGiveVote,
  actionRequestAddItem,
  actionRequestTopItems
} from "./state-management/actions/livepoll-actions";

function onmessage(event) {
  let store = getLivepollStore();
  let payload = event.data.payload;

  switch (event.data.action) {
    case 'INIT':
      initAppState(event.data.appState);
      postMessage(getLivepollStore().getState());
      break;

    case 'ACTION_FETCH_POPULAR_POLLS':
      getLivepollStore().dispatch(actionFetchPopularPolls(payload.startAt, payload.howMany));
      break;

    case 'ACTION_FETCH_TRENDING_POLLS':
      getLivepollStore().dispatch(actionFetchTrendingPolls(payload.startAt, payload.howMany));
      break;

    case 'ACTION_UPDATE_BASIC_INFO':
      getLivepollStore().dispatch(actionRequestUpdateBasicInfo(payload.idToken, payload.data));
      break;

    case 'ACTION_FETCH_POLL_INFO':
      getLivepollStore().dispatch(actionFetchPollInfo(payload.id));
      break;

    case 'ACTION_REQUEST_ADD_ITEM':
      getLivepollStore().dispatch(actionRequestAddItem(payload.idToken, payload.pollId, payload.data));
      break;

    case 'ACTION_FETCH_TOP_ITEMS':
      getLivepollStore().dispatch(actionRequestTopItems(payload.pollId, payload.startAt, payload.howMany));
      break;

    case 'ACTION_GIVE_VOTE':
      getLivepollStore().dispatch(actionGiveVote(payload.idToken, payload.pollId, payload.itemId, payload.lastVotedItemId));
      break;

    case 'ACTION_FETCH_VOTER_LIST':
      getLivepollStore().dispatch(actionFetchVoterList(payload.pollId, payload.itemId, payload.startAt, payload.howMany));
      break;

    case 'ACTION_CHECK_ALREADY_VOTED_POLL':
      getLivepollStore().dispatch(actionRequestCheckAlreadyVotedPoll(payload.idToken, payload.pollId));
      break;

    default:
  }
}
self.addEventListener('message', onmessage);