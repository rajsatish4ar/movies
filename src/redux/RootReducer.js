import {combineReducers} from 'redux';
import auth from './auth/Reducer';
import app from './app/Reducer';
import { reducer as form } from 'redux-form'
const AppReducers = {
  auth,
  app,
  form
};
const AllReducer = combineReducers(AppReducers);
const RootReducer = (state, action) => {
  if (action.type === 'RESET_STATE') {
    state = undefined;
  }

  return AllReducer(state, action);
};
export default RootReducer;
