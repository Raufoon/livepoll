import getLivepollStore from "./state-management";
import {actionStateUpdatedFromWorker} from "../state-management/actions/worker-sync-actions";
import workerScript from "../workers/state-manager/state-manager-worker";

let stateManagerWorker;

export const initStateManagerWorker = () => {
  if (!window.Worker) {
    throw Error('Worker not supported');
  }

  stateManagerWorker = new Worker(workerScript);
  window.worker = stateManagerWorker;
  stateManagerWorker.onmessage = (event => {
    console.log('MAIN' + event.data)
    // getLivepollStore().dispatch(actionStateUpdatedFromWorker(event.data));
  })
};