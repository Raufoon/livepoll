import { fetchProfileDetails, loadRecentPollsForHome } from "../services/read-requests"
import { editProfile, createNewPoll } from "../services/write-requests"

export function actionFetchProfileDetails(uid) {
  return async function(dispatch) {
    try {
      const {data, errors} = await fetchProfileDetails(uid)

      if (data) dispatch(actionFetchProfileDetailsSuccess(data.data))
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
      if (data) dispatch(actionEditProfileDetailsSuccess(uid, data.data))
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

export function actionCreateNewPoll(pollData) {
  return async function(dispatch) {
    try {
      const {data, errors} = await createNewPoll(pollData)

      if (data) dispatch(actionCreateNewPollSuccess(data.data))
      else if (errors) dispatch(actionCreateNewPollFailure(errors))
    }
    catch(err) {
      dispatch(actionCreateNewPollFailure(err))
    }
  }
}

export const ACTION_CREATE_NEW_POLL_SUCCESS = 'ACTION_CREATE_NEW_POLL_SUCCESS'

function actionCreateNewPollSuccess(pollData) {
  return {
    type: ACTION_CREATE_NEW_POLL_SUCCESS,
    ...pollData
  }
}

export const ACTION_CREATE_NEW_POLL_FAILURE = 'ACTION_CREATE_NEW_POLL_FAILURE'

function actionCreateNewPollFailure(error) {
  return {
    type: ACTION_CREATE_NEW_POLL_FAILURE,
    error
  }
}

export function actionLoadHomeRecentPolls() {
  return async function(dispatch) {
    try {
      const {data, errors} = await loadRecentPollsForHome()
      if (data) {
        dispatch(actionLoadHomeRecentPollsSuccess(data.data))
      }
      else if (errors) {
        dispatch(actionLoadHomeRecentPollsFailure(errors))  
      }
    }
    catch(err) {
      dispatch(actionLoadHomeRecentPollsFailure(err))
    }
  }
}

export const ACTION_LOAD_HOME_RECENT_POLLS_SUCCESS = 'ACTION_LOAD_HOME_RECENT_POLLS_SUCCESS'

export function actionLoadHomeRecentPollsSuccess(data) {
  return {
    type: ACTION_LOAD_HOME_RECENT_POLLS_SUCCESS,
    ...data
  }
}

export const ACTION_LOAD_HOME_RECENT_POLLS_FAILURE = 'ACTION_LOAD_HOME_RECENT_POLLS_FAILURE'

export function actionLoadHomeRecentPollsFailure(error) {
  return {
    type: ACTION_LOAD_HOME_RECENT_POLLS_FAILURE,
    error
  }
}
