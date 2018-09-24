import {ACTION_FETCH_POLL_INFO_SUCCESS, ACTION_REQUEST_ADD_ITEM_SUCCESS} from "../../actions/livepoll-actions";
import initialState from "../../initial-state";
import {reduceFetchPollInfoSuccess, reduceRequestAddItemSuccess} from "./livepoll-reducers";

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

    default:
      return state;
  }
};

export default livepollRootReducer;