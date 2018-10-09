import {
  ACTION_FETCH_POLL_INFO_SUCCESS, ACTION_FETCH_VOTER_LIST_SUCCESS,
  ACTION_GIVE_VOTE_SUCCESS, ACTION_POLL_REALTIME_UPDATE,
  ACTION_REQUEST_ADD_ITEM_SUCCESS,
  ACTION_REQUEST_TOP_ITEMS_SUCCESS
} from "../actions/livepoll-actions";
import initialState, {initialBlankState} from "../initial-state";
import {ACTION_SIGNOUT_SUCCESS} from "../actions/auth-actions";
import {ACTION_SYNC_MAIN_AND_WORKER} from "../actions/worker-sync-actions";

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

    case ACTION_SIGNOUT_SUCCESS:
      newState = {...initialBlankState.polls};
      return newState;

    case ACTION_SYNC_MAIN_AND_WORKER:
      return action.newState.polls ? action.newState.polls: state;

    default:
      return state;
  }
};

export default livepollReducer;