import {ACTION_FETCH_POLL_INFO_SUCCESS} from "../../actions/livepoll-actions";
import initialState from "../../initial-state";
import {reduceFetchPollInfoSuccess} from "./livepoll-reducers";

const livepollRootReducer = (state = initialState.polls, action) => {
  let newState;
  switch (action.type) {
    case ACTION_FETCH_POLL_INFO_SUCCESS:
      newState = reduceFetchPollInfoSuccess(state, action.livepoll);
      break;
    default:
      newState = state;
  }
  return newState;
};

export default livepollRootReducer;