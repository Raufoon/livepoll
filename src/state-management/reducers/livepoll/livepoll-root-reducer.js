import {ACTION_FETCH_POLL_INFO_SUCCESS, ACTION_REQUEST_ADD_ITEM_SUCCESS} from "../../actions/livepoll-actions";
import initialState from "../../initial-state";
import {reduceFetchPollInfoSuccess, reduceRequestAddItemSuccess} from "./livepoll-reducers";

const livepollRootReducer = (state = initialState.polls, action) => {
  let newState;
  switch (action.type) {
    case ACTION_FETCH_POLL_INFO_SUCCESS:
      newState = reduceFetchPollInfoSuccess(state, action.livepoll);
      break;
    case ACTION_REQUEST_ADD_ITEM_SUCCESS:
      newState = reduceRequestAddItemSuccess(state, action.pollId, action.newItem);
      break;
    default:
      newState = state;
  }
  return newState;
};

export default livepollRootReducer;