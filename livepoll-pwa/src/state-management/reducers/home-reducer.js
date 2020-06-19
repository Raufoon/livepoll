import { ACTION_LOAD_HOME_RECENT_POLLS_SUCCESS } from "../actions/home-actions"

const initialState = {
  recentPolls: []
}

export default function homeReducer(state = initialState, action) {
  const {type, ...data} = action
  const {home} = data
  
  switch(type) {
    case ACTION_LOAD_HOME_RECENT_POLLS_SUCCESS:
      return {
        ...state,
        recentPolls: {
          ...state.recentPolls, 
          ...home.recentPolls.reduce(function(result, poll) {
            result[poll.id] = poll
            return result
          }, {})
        }
      }

    default:
      return state
  }
}
