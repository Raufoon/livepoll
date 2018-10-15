import initialState from "../initial-state";
import {
  ACTION_ALREADY_VOTED_POLL_FOUND, ACTION_FETCH_MY_POLLS_SUCCESS,
  ACTION_MY_PROFILE_BASIC_INFO_UPDATE_SUCCESS
} from "../actions/my-profile-actions";
import {ACTION_SIGNOUT_SUCCESS} from "../actions/auth-actions";
import {ACTION_SYNC_MAIN_AND_WORKER} from "../actions/worker-sync-actions";

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
      break;

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
      break;

    case ACTION_SIGNOUT_SUCCESS:
      newState = {
        ...state,
        votedPolls: {},
        basicInfo: {}
      };
      break;

    case ACTION_FETCH_MY_POLLS_SUCCESS:
      newState = {
        ...state,
        myPolls: Object.values({
          ...state.myPolls,
          ...action.myPolls,
        }).sort((A, B) => A.voteCount > B.voteCount ? -1 : 1)
      };
      break;

    case ACTION_SYNC_MAIN_AND_WORKER:
      newState = action.newState.myProfile? action.newState.myProfile: state;
      break;

    default:
      newState = state;
  }

  if (newState != state) {
    postMessage({
      myProfile: newState
    });
  }

  return newState;
};

export default myProfileReducer