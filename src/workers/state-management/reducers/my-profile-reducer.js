import initialState from "../initial-state";
import {
  ACTION_ALREADY_VOTED_POLL_FOUND,
  ACTION_MY_PROFILE_BASIC_INFO_UPDATE_SUCCESS
} from "../actions/my-profile-actions";
import {ACTION_SIGNOUT_SUCCESS} from "../actions/auth-actions";

const myProfileReducer = (state = initialState.myProfile, action) => {
  let newState;

  switch (action.type) {
    case ACTION_MY_PROFILE_BASIC_INFO_UPDATE_SUCCESS:
      newState = {
        ...state,
        basicInfo: {
          ...state.basicInfo,
          ...action.basicInfo
        }
      };
      postMessage({
        myProfile: newState
      });
      return newState;

    case ACTION_ALREADY_VOTED_POLL_FOUND:
      newState = {...state};
      if (action.lastVotedItemId && action.lastVotedItemId === action.votedItemId) {
        newState.votedPolls = {
          ...newState.votedPolls
        };
        delete newState.votedPolls[action.pollId];
      } else {
        newState.votedPolls[action.pollId] = action.votedItemId;
      }
      postMessage({
        myProfile: newState
      });
      return newState;

    case ACTION_SIGNOUT_SUCCESS: // TODO: sync worker
      return {
        ...state,
        votedPolls: {},
        basicInfo: {}
      };

    default:
      return state;
  }
};

export default myProfileReducer