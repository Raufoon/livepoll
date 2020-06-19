import { ACTION_CREATE_NEW_POLL_SUCCESS, ACTION_FETCH_POLL_DETAILS_SUCCESS, ACTION_CREATE_NEW_ITEM_SUCCESS } from "../actions/poll-actions"

export default function pollReducer(state = {}, action) {
  const {type, ...data} = action

  if (type === ACTION_CREATE_NEW_POLL_SUCCESS) {
    const {newPoll} = data
    const {id} = newPoll
    return {
      ...state,
      [id]: newPoll
    }
  }

  else if (type === ACTION_FETCH_POLL_DETAILS_SUCCESS) {
    const {poll} = data
    const {id} = poll
    return {
      ...state,
      [id]: {
        ...state[id],
        ...poll
      }
    }
  }

  else if (type === ACTION_CREATE_NEW_ITEM_SUCCESS) {
    return state
  }

  else return state
}
