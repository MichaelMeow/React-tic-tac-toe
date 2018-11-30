import { combineReducers } from 'redux';
import historyReducer from './historyReducer';
import turnReducer from './turnReducer';

const rootReducer = combineReducers({
  historySlice: historyReducer,
  turnSlice: turnReducer
});

export default rootReducer;
