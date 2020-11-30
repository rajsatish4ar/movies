import {call, put, takeLatest} from 'redux-saga/effects';
import {setAuthState, verifyLogin} from './Actions';
import {emailLogin,doLogout,resetState} from './Actions';
import Root from '../../utils/Root';
import Pref from 'react-native-default-preference';
import NetInfo from '@react-native-community/netinfo';
import {APP_FLOW, dbRef, KEYS} from '../../const';
import _ from 'lodash';
import {isValueNullOrEmpty} from '../../utils/Validations';
import Restart from 'react-native-restart'
function* verifyLogin$(action) {
  const conn = yield NetInfo.fetch();
  const isConnected = conn?.isConnected
  if(!isConnected){
    yield put(setAuthState({appFlow: APP_FLOW.OFFLINE}));
    return
  }
  const uuid = yield Pref.get(KEYS.UUID);
  if (isValueNullOrEmpty(uuid)) {
    yield put(setAuthState({appFlow: APP_FLOW.LOGIN}));
    return;
  }
  const snap = yield dbRef.child(uuid).once('value');
  const data = snap?.val()
  if(isValueNullOrEmpty(data?.email)) {
    yield put(setAuthState({appFlow: APP_FLOW.LOGIN}));
    return;
  }
  yield put(setAuthState({...data}));
  yield put(setAuthState({appFlow: APP_FLOW.APP}));
}

function* emailLogin$(action) {
  const {payload = {}} = action?.payload;
  Root.showLoader()
  const snap = yield dbRef
    .orderByChild('email')
    .equalTo(payload.email)
    .once('value');
    Root.hideLoader()
  const snapData = snap.val() ?? {};
  const iids = Object.keys(snapData);
  const users = Object.values(snapData);
  console.log("🚀 ~ file: Saga.js ~ line 39 ~ users", users)
  const {isLogin, ...data} = payload;
  if (isLogin) {
    if(users.length==0) return Root.showToast('Email not regiostred');
    const index = _?.findIndex(users, {
      email: payload.email,
      password: payload.password,
    });
    if (index < 0) return Root.showToast('Enter valid email & password');
    const u = users[index];
    const uuid = iids[index];
    u.uuid = uuid
    yield Pref.set(KEYS.EMAIL,payload.email)
    yield Pref.set(KEYS.NAME,payload.name)
    yield Pref.set(KEYS.PASSWORD,payload.password)
    yield Pref.set(KEYS.UUID,u.uuid)
    yield put(setAuthState({...u, uuid,appFlow:APP_FLOW.APP}));
  

  } else {
    if(users.length>0) return Root.showToast('Email Already exist')
    const snap = yield dbRef.push(data);
    payload.uuid = snap.key;
    yield Pref.set(KEYS.EMAIL,payload.email)
    yield Pref.set(KEYS.NAME,payload.name)
    yield Pref.set(KEYS.PASSWORD,payload.password)
    yield Pref.set(KEYS.UUID,payload.uuid)
    yield put(setAuthState({...payload,appFlow:APP_FLOW.APP}));
  }
  
}

function* doLogout$(action) {
  yield Pref.clearAll()
  yield put(setAuthState({appFlow: APP_FLOW.LOGIN}));
  Restart.Restart()
  yield put(setAuthState({}));
}


export default function* rootSaga() {
  yield takeLatest(verifyLogin, verifyLogin$);
  yield takeLatest(emailLogin, emailLogin$);
  yield takeLatest(doLogout, doLogout$);
}
