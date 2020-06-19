import { loadRecentPollsForHome } from "../../services/read-requests"

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
