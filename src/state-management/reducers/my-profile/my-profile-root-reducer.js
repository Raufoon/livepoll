import initialState from "../../initial-state";
import {
  ACTION_ALREADY_VOTED_POLL_FOUND,
  ACTION_MY_PROFILE_BASIC_INFO_UPDATE_SUCCESS
} from "../../actions/my-profile-actions";

const myProfileRootReducer = (state = initialState.myProfile, action) => {
  let newState;
  switch (action.type) {
    case ACTION_MY_PROFILE_BASIC_INFO_UPDATE_SUCCESS:
      return {...state, basicInfo: {...state.basicInfo, ...action.basicInfo}};

    case ACTION_ALREADY_VOTED_POLL_FOUND:
      newState = {...state};
      if (action.lastVotedItemId && action.lastVotedItemId === action.votedItemId) {
        newState.votedPolls = {...newState.votedPolls};
        delete newState.votedPolls[action.pollId];
      } else {
        newState.votedPolls[action.pollId] = action.votedItemId;
      }
      return newState;
    default:
      return state;
  }
};

export default myProfileRootReducer