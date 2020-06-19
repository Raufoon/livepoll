import { ACTION_CREATE_NEW_POLL_SUCCESS } from "../actions/poll-actions"

export default function pollReducer(state = {}, action) {
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
