import { fetchProfileDetails } from "../services/requests"

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
