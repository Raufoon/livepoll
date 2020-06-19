import {combineReducers} from 'redux'
import userReducer from './reducers/user-reducer'
import pollReducer from './reducers/poll-reducer'
import homeReducer from './reducers/home-reducer'

const rootReducer = combineReducers({
  users: userReducer,
  polls: pollReducer,
  home: homeReducer
})

export default rootReducer
