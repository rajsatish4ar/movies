import {configureStore, getDefaultMiddleware} from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import RootReducer from './RootReducer';
import AppSaga from './RootSaga';
const sagaMiddleware = createSagaMiddleware();

function configStore(initialState = {}) {
  // Create the store with two middlewares
  // 1. sagaMiddleware: Makes redux-sagas work
  // 2. routerMiddleware: Syncs the location/URL path to the state
  // 3. thunk is included in getDefaultMiddleware
  const middlewares = [
    ...getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
    sagaMiddleware,
  ];
  const store = configureStore({
    reducer: RootReducer,
    middleware: middlewares,
    preloadedState: initialState,
    devTools: __DEV__ ? true : false,
  });
  sagaMiddleware.run(AppSaga);
  // Extensions
  store.runSaga = sagaMiddleware.run;
  /* istanbul ignore next */
  if (module.hot) {
    module.hot.accept('reducers', () => {
      store.replaceReducer(reducers(store.injectedReducers));
    });
  }
  return store;
}

const initialState = {};
const store = configStore(initialState);
export default store;
