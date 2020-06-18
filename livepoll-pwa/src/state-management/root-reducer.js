import {combineReducers} from 'redux'
import userReducer from './reducers/user-reducer'
import pollReducer from './reducers/poll-reducer'

const rootReducer = combineReducers({
  users: userReducer,
  polls: pollReducer
})

export default rootReducer
