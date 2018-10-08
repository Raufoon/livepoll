import {getLivepollStore, initAppState} from "./init";
import {actionFetchPopularPolls, actionFetchTrendingPolls} from "./state-management/actions/home-actions";

function onmessage(event) {
  let store = getLivepollStore();
  let data = event.data;
  switch (event.data.action) {
    case 'INIT':
      initAppState(data.appState);
      postMessage(getLivepollStore().getState());
      break;

    case 'ACTION_FETCH_POPULAR_POLLS':
      getLivepollStore().dispatch(actionFetchPopularPolls(data.payload.startAt, data.payload.howMany));
      break;

    case 'ACTION_FETCH_TRENDING_POLLS':
      getLivepollStore().dispatch(actionFetchTrendingPolls(data.payload.startAt, data.payload.howMany));
      break;
  }
}
self.addEventListener('message', onmessage);