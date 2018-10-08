export const ACTION_STATE_UPDATED_FROM_WORKER = 'ACTION_STATE_UPDATED_FROM_WORKER';

export const actionStateUpdatedFromWorker = newState => ({
  type: ACTION_STATE_UPDATED_FROM_WORKER,
  newState
});