import {ACTION_FETCH_PROFILE_DETAILS_SUCCESS, ACTION_EDIT_PROFILE_DETAILS_SUCCESS} from '../actions/user-actions'
import {ACTION_FETCH_PROFILE_DETAILS_FAILURE} from '../actions/user-actions'

export default function userReducer(state = {}, action) {
  const {type, ...data} = action

  if (type === ACTION_FETCH_PROFILE_DETAILS_SUCCESS) {
    const {user} = data
    const {id} = user
    return {
      ...state,
      [id]: user
    }
  }

  else if (type === ACTION_FETCH_PROFILE_DETAILS_FAILURE) {
    const {uid, error} = data
    return {
      ...state,
      [uid]: {hasError: true, error}
    }
  }

  else if (type === ACTION_EDIT_PROFILE_DETAILS_SUCCESS) {
    const {newDetails} = data
    const {id} = newDetails
    return {
      ...state,
      [id]: newDetails
    }
  }

  else return state
}
