import { ACTION_LOAD_HOME_RECENT_POLLS_SUCCESS } from "../actions"

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
        recentPolls: [...state.recentPolls, ...home.recentPolls]
      }

    default:
      return state
  }
}
