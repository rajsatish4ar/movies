import {all} from 'redux-saga/effects';
import AuthSagas from './auth/Saga';
import AppSagas from './app/Saga';


export default function* rootSaga() {
    yield all([
      AuthSagas(),
      AppSagas(),
    ]);
  }