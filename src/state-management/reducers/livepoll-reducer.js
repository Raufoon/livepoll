import {
  ACTION_FETCH_POLL_INFO_SUCCESS, ACTION_FETCH_VOTER_LIST_SUCCESS,
  ACTION_GIVE_VOTE_SUCCESS, ACTION_POLL_REALTIME_UPDATE,
  ACTION_REQUEST_ADD_ITEM_SUCCESS,
  ACTION_REQUEST_TOP_ITEMS_SUCCESS
} from "../actions/livepoll-actions";
import initialState from "../initial-state";
import {ACTION_SIGNOUT_SUCCESS} from "../actions/auth-actions";

const livepollReducer = (state = initialState.polls, action) => {
  let newState = {...state},
    i,
    item;

  switch (action.type) {
    case ACTION_FETCH_POLL_INFO_SUCCESS:
      return {
        ...state,
        [action.livepoll.id] : {
          ...state[action.livepoll.id],
          ...action.livepoll
        }
      };

    case ACTION_REQUEST_ADD_ITEM_SUCCESS:
      return {
        ...state,
        [action.pollId]: {
          ...state[action.pollId],
          items: {
            ...state[action.pollId].items,
            [action.newItem.id]: action.newItem
          }
        }
      };

    case ACTION_REQUEST_TOP_ITEMS_SUCCESS:
      newState = {
        ...state,
        [action.pollId]: {
          ...state[action.pollId],
          items: {
            ...state[action.pollId].items
          }
        }
      };
      action.items.forEach(item => {
        newState[action.pollId].items[item.id] = item;
      });
      return newState;

    case ACTION_GIVE_VOTE_SUCCESS:
      newState = {
        ...state,
        [action.pollId]: {
          ...state[action.pollId]
        }
      };
      for (i = 0; i < action.updatedItems.length; i++) {
        // there would be a second item in case you recast your vote
        item = action.updatedItems[i];
        newState[action.pollId].items[item.id].voteCount = item.voteCount;
      }
      return newState;

    case ACTION_FETCH_VOTER_LIST_SUCCESS:
      return {
        ...state,
        [action.pollId]: {
          ...state[action.pollId],
          items: {
            ...state[action.pollId].items,
            [action.itemId]: {
              ...state[action.pollId].items[action.itemId],
              voterIds: Object.values({
                ...(state[action.pollId].items[action.itemId].voterIds || {}),
                ...action.voterList
              })
            }
          }
        }
      };

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
      newState = {...initialState.polls};
      return newState;

    default:
      return state;
  }
};

export default livepollReducer;