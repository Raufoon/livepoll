import {actionFetchTrendingPolls} from "./home-actions";
import {getStateManagerWorker} from "../../init/state-manager-worker";
import {getLoggedInUser} from "../../util/cloud/auth";

export const actionRequestUpdateBasicInfo = data => dispatch => {
  getLoggedInUser().getIdToken().then(idToken => {
    getStateManagerWorker().postMessage({
      action: 'ACTION_UPDATE_BASIC_INFO',
      payload: {
        idToken,
        data
      }
    });
  })
};

export const ACTION_MY_PROFILE_BASIC_INFO_UPDATE_SUCCESS = 'ACTION_MY_PROFILE_BASIC_DATA_UPDATE_SUCCESS';
export const actionMyProfileBasicInfoUpdateSuccess = (basicInfo) => ({
  type: ACTION_MY_PROFILE_BASIC_INFO_UPDATE_SUCCESS,
  basicInfo
});

export const actionRequestCheckAlreadyVotedPoll = pollId => dispatch => {
  getLoggedInUser().getIdToken().then(idToken => {
    getStateManagerWorker().postMessage({
      action: 'ACTION_CHECK_ALREADY_VOTED_POLL',
      payload: {
        pollId,
        idToken
      }
    });
  })
};

export const actionFetchMyPolls = () => dispatch => {
  dispatch(actionFetchTrendingPolls(0, 6))
};