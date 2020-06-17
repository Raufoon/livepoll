import {ACTION_FETCH_PROFILE_DETAILS_SUCCESS, ACTION_EDIT_PROFILE_DETAILS_FAILURE, ACTION_EDIT_PROFILE_DETAILS_SUCCESS} from '../actions'
import {ACTION_FETCH_PROFILE_DETAILS_FAILURE} from '../actions'

export default function userReducer(state = {}, action) {
  const {type, ...data} = action
  
  switch(type) {
 
    case ACTION_FETCH_PROFILE_DETAILS_SUCCESS:
      const {user} = data
      return {
        ...state,
        [user.id]: user
      }
    
    case ACTION_FETCH_PROFILE_DETAILS_FAILURE:
      const {uid, error} = data
      return {
        ...state,
        [uid]: {hasError: true, error}
      }

    case ACTION_EDIT_PROFILE_DETAILS_SUCCESS:
      const {newDetails} = data
      return {
        ...state,
        [newDetails.id]: newDetails
      }

    default:
      return state
  }
}