import {requestUpdateMyProfileBasicInfo} from "../../util/cloud/user";

export const actionRequestUpdateBasicInfo = data => dispatch => {
  return requestUpdateMyProfileBasicInfo(data)
    .then(response => dispatch(actionMyProfileBasicInfoUpdateSuccess(response.basicInfo)));
};

export const ACTION_MY_PROFILE_BASIC_INFO_UPDATE_SUCCESS = 'ACTION_MY_PROFILE_BASIC_DATA_UPDATE_SUCCESS';
export const actionMyProfileBasicInfoUpdateSuccess = (basicInfo) => ({
  type: ACTION_MY_PROFILE_BASIC_INFO_UPDATE_SUCCESS,
  basicInfo
});