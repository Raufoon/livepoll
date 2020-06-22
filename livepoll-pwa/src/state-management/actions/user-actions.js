import { fetchProfileDetails } from "../../services/read-requests"
import { editProfile } from "../../services/write-requests"

export function actionFetchProfileDetails(uid) {
  return async function(dispatch) {
    try {
      const {data, errors} = await fetchProfileDetails(uid)

      if (data) dispatch(actionFetchProfileDetailsSuccess(data))
      else if (errors) dispatch(actionFetchProfileDetailsFailure(uid, errors))
    }
    catch(err) {
      dispatch(actionFetchProfileDetailsFailure(uid, err))
    }
  }
}

export const ACTION_FETCH_PROFILE_DETAILS_SUCCESS = 'ACTION_FETCH_PROFILE_DETAILS_SUCCESS'

function actionFetchProfileDetailsSuccess(data) {
  return {
    type: ACTION_FETCH_PROFILE_DETAILS_SUCCESS,
    ...data
  }
}

export const ACTION_FETCH_PROFILE_DETAILS_FAILURE = 'ACTION_FETCH_PROFILE_DETAILS_FAILURE'

function actionFetchProfileDetailsFailure(uid, error) {
  return {
    type: ACTION_FETCH_PROFILE_DETAILS_FAILURE,
    error,
    id: uid
  }
}

export function actionEditProfileDetails(uid, details) {
  return async function(dispatch) {
    try {
      const {data, errors} = await editProfile(details)
      if (data) dispatch(actionEditProfileDetailsSuccess(uid, data))
      else if (errors) dispatch(actionEditProfileDetailsFailure(uid, errors))
    }
    catch(err) {
      dispatch(actionEditProfileDetailsFailure(uid, err))
    }
  }
}

export const ACTION_EDIT_PROFILE_DETAILS_SUCCESS = 'ACTION_EDIT_PROFILE_DETAILS_SUCCESS'

function actionEditProfileDetailsSuccess(uid, data) {
  return {
    type: ACTION_EDIT_PROFILE_DETAILS_SUCCESS,
    ...data,
    id: uid
  }
}

export const ACTION_EDIT_PROFILE_DETAILS_FAILURE = 'ACTION_EDIT_PROFILE_DETAILS_FAILURE'

function actionEditProfileDetailsFailure(uid, error) {
  return {
    type: ACTION_EDIT_PROFILE_DETAILS_FAILURE,
    error,
    id: uid
  }
}
