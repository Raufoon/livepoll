import { ACTION_LOAD_HOME_RECENT_POLLS_SUCCESS } from "../actions/home-actions"

const initialState = {
  recentPolls: []
}

export default function homeReducer(state = initialState, action) {
  const {type, ...data} = action

  if (type === ACTION_LOAD_HOME_RECENT_POLLS_SUCCESS) {
    const {home} = data
    const {recentPolls} = home

    return {
      ...state,

      recentPolls: {
        ...state.recentPolls, 

        ...recentPolls.reduce(function(result, poll) {
          const {id} = poll
          result[id] = poll
          return result
        }, {})
      }
    }
  }

  else return state
}
