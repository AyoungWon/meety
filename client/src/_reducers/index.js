import { combineReducers } from 'redux';
import user from './user_reducer';
import stream from './room_reducer'

const rootReducer = combineReducers({
   stream ,
   user
})


export default rootReducer;