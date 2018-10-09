import {ACTION_POLL_REALTIME_UPDATE, ACTION_REQUEST_ADD_ITEM_SUCCESS} from "../actions/livepoll-actions";
import initialState, {initialBlankState} from "../initial-state";
import {ACTION_SIGNOUT_SUCCESS} from "../actions/auth-actions";
import {ACTION_SYNC_MAIN_AND_WORKER} from "../actions/worker-sync-actions";
import {getStateManagerWorker} from "../../init/state-manager-worker";

const livepollReducer = (state = initialState.polls, action) => {
  let newState = {...state};

  switch (action.type) {
    case ACTION_POLL_REALTIME_UPDATE:
      return {
        ...state,
        [action.pollId]: {
          ...state[action.pollId],
          items: {
            ...state[action.pollId].items,
            [action.itemId]: {
              ...state[action.pollId].items[action.itemId],
              voteCount: action.voteCount
            }
          }
        }
      };

    case ACTION_REQUEST_ADD_ITEM_SUCCESS:
      newState = {
        ...state,
        [action.pollId]: {
          ...state[action.pollId],
          items: {
            ...state[action.pollId].items,
            [action.newItem.id]: action.newItem
          }
        }
      };
      getStateManagerWorker().postMessage({
        action: ACTION_SYNC_MAIN_AND_WORKER,
        payload: {
          polls: newState
        }
      });
      return newState;

    case ACTION_SIGNOUT_SUCCESS:
      newState = {...initialBlankState.polls};
      getStateManagerWorker().postMessage({
        action: ACTION_SYNC_MAIN_AND_WORKER,
        payload: {
          polls: newState
        }
      });
      return newState;

    case ACTION_SYNC_MAIN_AND_WORKER:
      return action.newState.polls ? action.newState.polls: state;

    default:
      return state;
  }
};

export default livepollReducer;