import {requestCheckHaveIVoted, requestUpdateMyProfileBasicInfo} from "../../util/cloud/user";

export const actionRequestUpdateBasicInfo = data => dispatch => {
  return requestUpdateMyProfileBasicInfo(data)
    .then(response => dispatch(actionMyProfileBasicInfoUpdateSuccess(response.basicInfo)));
};

export const ACTION_MY_PROFILE_BASIC_INFO_UPDATE_SUCCESS = 'ACTION_MY_PROFILE_BASIC_DATA_UPDATE_SUCCESS';
export const actionMyProfileBasicInfoUpdateSuccess = (basicInfo) => ({
  type: ACTION_MY_PROFILE_BASIC_INFO_UPDATE_SUCCESS,
  basicInfo
});

export const actionRequestCheckAlreadyVotedPoll = pollId => dispatch => {
  return requestCheckHaveIVoted(pollId)
    .then(response => {
      if (!response.votedItemId) return;
      return dispatch(actionAlreadyVotedPollFound(
        pollId,
        response.votedItemId
      ))
    })
};

export const ACTION_ALREADY_VOTED_POLL_FOUND = 'ACTION_ALREADY_VOTED_POLL_FOUND';
export const actionAlreadyVotedPollFound = (pollId, votedItemId, lastVotedItemId) => ({
  type: ACTION_ALREADY_VOTED_POLL_FOUND,
  votedItemId, pollId, lastVotedItemId
});