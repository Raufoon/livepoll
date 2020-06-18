import { ACTION_CREATE_NEW_POLL_SUCCESS } from "../actions"

export default function userReducer(state = {}, action) {
  const {type, ...data} = action
  let newPoll
  
  switch(type) {

    case ACTION_CREATE_NEW_POLL_SUCCESS:
      newPoll = data.newPoll
      return {
        ...state,
        [newPoll.id]: newPoll
      }

    default:
      return state
  }
}