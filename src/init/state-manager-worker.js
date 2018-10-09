import * as StateManagerWorker from '../workers/state-manager.worker';
import getLivepollStore from "./state-management";
import {ACTION_SYNC_MAIN_AND_WORKER, actionSyncMainAndWorker} from "../state-management/actions/worker-sync-actions";

let stateManagerWorker;

export const initStateManagerWorker = () => {
  if (!window.Worker) {
    throw Error('Worker not supported');
  }

  stateManagerWorker = new StateManagerWorker();

  stateManagerWorker.onmessage = event => {
    getLivepollStore().dispatch(actionSyncMainAndWorker(event.data));
  };

  stateManagerWorker.postMessage({
    action: 'INIT'
  });
  stateManagerWorker.postMessage({
    action: ACTION_SYNC_MAIN_AND_WORKER,
    payload: getLivepollStore().getState()
  });
};

export const getStateManagerWorker = () => stateManagerWorker;