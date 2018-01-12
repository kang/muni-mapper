// @flow
import { combineReducers } from 'redux';
import muni from './muniReducer';

const rootReducer = combineReducers({
  muni,
});

export default rootReducer;
