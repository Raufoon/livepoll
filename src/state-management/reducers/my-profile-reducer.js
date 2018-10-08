import initialState from "../initial-state";
import {
  ACTION_ALREADY_VOTED_POLL_FOUND,
  ACTION_MY_PROFILE_BASIC_INFO_UPDATE_SUCCESS
} from "../actions/my-profile-actions";
import {ACTION_SIGNOUT_SUCCESS} from "../actions/auth-actions";
import {ACTION_SYNC_MAIN_AND_WORKER} from "../actions/worker-sync-actions";

const myProfileReducer = (state = initialState.myProfile, action) => {
  let newState;

  switch (action.type) {
    case ACTION_MY_PROFILE_BASIC_INFO_UPDATE_SUCCESS:
      return { // TODO: sync
        ...state,
        basicInfo: {
          ...state.basicInfo,
          ...action.basicInfo
        }
      };

    // case ACTION_ALREADY_VOTED_POLL_FOUND:
    //   newState = {...state};
    //   if (action.lastVotedItemId && action.lastVotedItemId === action.votedItemId) {
    //     newState.votedPolls = {
    //       ...newState.votedPolls
    //     };
    //     delete newState.votedPolls[action.pollId];
    //   } else {
    //     newState.votedPolls[action.pollId] = action.votedItemId;
    //   }
    //   return newState;

    case ACTION_SIGNOUT_SUCCESS:
      return {
        ...state,
        votedPolls: {},
        basicInfo: {}
      };

    case ACTION_SYNC_MAIN_AND_WORKER:
      return action.newState.myProfile? action.newState.myProfile: state;

    default:
      return state;
  }
};

export default myProfileReducer