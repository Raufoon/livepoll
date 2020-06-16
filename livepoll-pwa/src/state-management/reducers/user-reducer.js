import {ACTION_FETCH_PROFILE_DETAILS_SUCCESS} from '../actions'
import {ACTION_FETCH_PROFILE_DETAILS_FAILURE} from '../actions'

export default function userReducer(state = {}, action) {
  const {type, ...data} = action
  
  switch(type) {
 
    case ACTION_FETCH_PROFILE_DETAILS_SUCCESS:
      const {user} = data
      const {id} = user
      return {
        ...state,
        [id]: user
      }
    
    case ACTION_FETCH_PROFILE_DETAILS_FAILURE:
      const {uid, error} = data
      return {
        ...state,
        [uid]: {hasError: true, error}
      }

    default:
      return state
  }
}