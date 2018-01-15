// @flow
import { combineReducers } from 'redux';
import vehicle from './vehicleReducer';

const rootReducer = combineReducers({
  vehicle,
});

export default rootReducer;
