import {requestCheckHaveIVoted, requestUpdateMyProfileBasicInfo} from "../../util/cloud/user";
import {actionMakeErrorToast, actionMakeSuccessToast, actionMakeWarningToast} from "./toast-actions";
import {actionFetchTrendingPolls} from "./home-actions";

export const actionRequestUpdateBasicInfo = (idToken, data) => dispatch => {
  dispatch(actionMakeWarningToast('Trying to update your profile...'));
  return requestUpdateMyProfileBasicInfo(idToken, data)
    .then(response => {
      dispatch(actionMakeSuccessToast('Profile update successfull'));
      dispatch(actionMyProfileBasicInfoUpdateSuccess(response.basicInfo));
    })
    .catch(() => dispatch(actionMakeErrorToast('Failed to update profile!')));
};

export const ACTION_MY_PROFILE_BASIC_INFO_UPDATE_SUCCESS = 'ACTION_MY_PROFILE_BASIC_DATA_UPDATE_SUCCESS';
export const actionMyProfileBasicInfoUpdateSuccess = (basicInfo) => ({
  type: ACTION_MY_PROFILE_BASIC_INFO_UPDATE_SUCCESS,
  basicInfo
});

export const actionRequestCheckAlreadyVotedPoll = (idToken, pollId) => dispatch => {
  return requestCheckHaveIVoted(idToken, pollId)
    .then(response => {
      if (!response.votedItemId) return;
      return dispatch(actionAlreadyVotedPollFound(
        pollId,
        response.votedItemId
      ))
    }).catch(() => {
      dispatch(actionMakeErrorToast('Please refresh!'))
    })
};

export const ACTION_ALREADY_VOTED_POLL_FOUND = 'ACTION_ALREADY_VOTED_POLL_FOUND';
export const actionAlreadyVotedPollFound = (pollId, votedItemId, lastVotedItemId) => ({
  type: ACTION_ALREADY_VOTED_POLL_FOUND,
  votedItemId, pollId, lastVotedItemId
});

export const actionFetchMyPolls = () => dispatch => {
  dispatch(actionFetchTrendingPolls(0, 6))
};