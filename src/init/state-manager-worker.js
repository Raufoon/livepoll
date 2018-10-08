import * as StateManagerWorker from '../workers/state-manager.worker';
import getLivepollStore from "./state-management";
import {actionSyncMainAndWorker} from "../state-management/actions/worker-sync-actions";

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
    action: 'INIT',
    appState: getLivepollStore().getState()
  });
};

export const getStateManagerWorker = () => stateManagerWorker;