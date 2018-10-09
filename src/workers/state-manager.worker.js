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
import {ACTION_SYNC_MAIN_AND_WORKER} from "./state-management/actions/worker-sync-actions";
import {actionSyncMainAndWorker} from "../state-management/actions/worker-sync-actions";

function onmessage(event) {
  let store = getLivepollStore();

  let payload = event.data.payload;

  switch (event.data.action) {
    case 'INIT':
      initAppState(event.data.appState);
      postMessage(store.getState());
      break;

    case ACTION_SYNC_MAIN_AND_WORKER:
      store.dispatch(actionSyncMainAndWorker(payload));
      return;

    case 'ACTION_FETCH_POPULAR_POLLS':
      store.dispatch(actionFetchPopularPolls(payload.startAt, payload.howMany));
      break;

    case 'ACTION_FETCH_TRENDING_POLLS':
      store.dispatch(actionFetchTrendingPolls(payload.startAt, payload.howMany));
      break;

    case 'ACTION_UPDATE_BASIC_INFO':
      store.dispatch(actionRequestUpdateBasicInfo(payload.idToken, payload.data));
      break;

    case 'ACTION_FETCH_POLL_INFO':
      store.dispatch(actionFetchPollInfo(payload.id));
      break;

    case 'ACTION_REQUEST_ADD_ITEM':
      store.dispatch(actionRequestAddItem(payload.idToken, payload.pollId, payload.data));
      break;

    case 'ACTION_FETCH_TOP_ITEMS':
      store.dispatch(actionRequestTopItems(payload.pollId, payload.startAt, payload.howMany));
      break;

    case 'ACTION_GIVE_VOTE':
      store.dispatch(actionGiveVote(payload.idToken, payload.pollId, payload.itemId, payload.lastVotedItemId));
      break;

    case 'ACTION_FETCH_VOTER_LIST':
      store.dispatch(actionFetchVoterList(payload.pollId, payload.itemId, payload.startAt, payload.howMany));
      break;

    case 'ACTION_CHECK_ALREADY_VOTED_POLL':
      store.dispatch(actionRequestCheckAlreadyVotedPoll(payload.idToken, payload.pollId));
      break;

    default:
  }
}
self.addEventListener('message', onmessage);