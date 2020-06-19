import { createNewPoll } from "../../services/write-requests"
import { fetchPollDetails } from "../../services/read-requests"

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

export function actionFetchPollDetails(id) {
  return async function(dispatch) {
    try {
      const {data, errors} = await fetchPollDetails(id)
      if (data) dispatch(actionFetchPollDetailsSuccess(data.data))
      else if (errors) dispatch(actionFetchPollDetailsFailure(errors))
    }
    catch(err) {
      dispatch(actionFetchPollDetailsFailure(err))
    }
  }
}

export const ACTION_FETCH_POLL_DETAILS_SUCCESS = 'ACTION_FETCH_POLL_DETAILS_SUCCESS'

export function actionFetchPollDetailsSuccess({poll}) {
  return {
    type: ACTION_FETCH_POLL_DETAILS_SUCCESS,
    poll
  }
}

export const ACTION_FETCH_POLL_DETAILS_FAILURE = 'ACTION_FETCH_POLL_DETAILS_FAILURE'

export function actionFetchPollDetailsFailure(error) {
  return {
    type: ACTION_FETCH_POLL_DETAILS_FAILURE,
    error
  }
}
