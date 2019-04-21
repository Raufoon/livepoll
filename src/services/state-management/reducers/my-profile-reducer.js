import initialState from "../initial-state";
import {ACTION_MY_PROFILE_BASIC_INFO_UPDATE_SUCCESS} from "../actions/my-profile-actions";
import {ACTION_SIGNOUT_SUCCESS} from "../actions/auth-actions";
import {ACTION_SYNC_MAIN_AND_WORKER} from "../actions/worker-sync-actions";
import {getStateManagerWorker} from "../../state-manager-worker";

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
      getStateManagerWorker().postMessage({
        action: ACTION_SYNC_MAIN_AND_WORKER,
        payload: {
          myProfile: newState
        }
      });
      return newState;

    case ACTION_SIGNOUT_SUCCESS:
      newState = {
        ...state,
        votedPolls: {},
        basicInfo: {}
      };
      getStateManagerWorker().postMessage({
        action: ACTION_SYNC_MAIN_AND_WORKER,
        payload: {
          myProfile: newState
        }
      });
      return newState;

    case ACTION_SYNC_MAIN_AND_WORKER:
      return action.newState.myProfile? action.newState.myProfile: state;

    default:
      return state;
  }
};

export default myProfileReducer