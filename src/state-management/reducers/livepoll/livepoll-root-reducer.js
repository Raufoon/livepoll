import {
  ACTION_FETCH_POLL_INFO_SUCCESS, ACTION_GIVE_VOTE_SUCCESS,
  ACTION_REQUEST_ADD_ITEM_SUCCESS,
  ACTION_REQUEST_TOP_ITEMS_SUCCESS
} from "../../actions/livepoll-actions";
import initialState from "../../initial-state";
import {
  reduceFetchPollInfoSuccess, reduceGiveVoteSuccess,
  reduceRequestAddItemSuccess,
  reduceRequestFirstNItemsSuccess
} from "./livepoll-reducers";
import {ACTION_SIGNOUT_SUCCESS} from "../../actions/auth-actions";

const livepollRootReducer = (state = initialState.polls, action) => {
  let newState = {...state};

  switch (action.type) {
    case ACTION_FETCH_POLL_INFO_SUCCESS:
      newState[action.livepoll.id]
        = reduceFetchPollInfoSuccess(newState[action.livepoll.id] || {}, action.livepoll);
      return newState;

    case ACTION_REQUEST_ADD_ITEM_SUCCESS:
      newState[action.pollId]
        = reduceRequestAddItemSuccess(newState[action.pollId], action.newItem);
      return newState;

    case ACTION_REQUEST_TOP_ITEMS_SUCCESS:
      newState[action.pollId]
        = reduceRequestFirstNItemsSuccess(newState[action.pollId], action.items);
      return newState;

    case ACTION_GIVE_VOTE_SUCCESS:
      newState[action.pollId]
        = reduceGiveVoteSuccess(newState[action.pollId], action.itemId, action.lastVotedItemId);
      return newState;

    case ACTION_SIGNOUT_SUCCESS:
      newState = {...initialState.polls};
      return newState;

    default:
      return state;
  }
};

export default livepollRootReducer;